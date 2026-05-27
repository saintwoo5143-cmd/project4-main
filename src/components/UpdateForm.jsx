import { useState } from 'react'
import InputInfo from './InputInfo'
import UpdateImageControls from './UpdateImageControls'
import UpdatePreviewCard from './UpdateImagePreview'

function normalizeImageSrc(src) {
  if (!src || !src.trim()) return '/public/noImage.jpg'

  if (
    src.startsWith('data:') ||
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('/')
  ) {
    return src
  }

  if (src.startsWith('./')) {
    return src.replace('./', '/')
  }

  return `/${src}`
}

function getSavableImageUrl(imageUrl) {
  const invalidPreviewImages = [
    '/test_src/error.png',
    './test_src/error.png',
    '/test_src/loading.gif',
    './test_src/loading.gif',
  ]

  if (!imageUrl || invalidPreviewImages.includes(imageUrl)) {
    return '/noImage.jpg'
  }

  return imageUrl
}

function UpdateForm({ initialBook, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialBook.title || '')
  const [author, setAuthor] = useState(initialBook.author || '')
  const [content, setContent] = useState(initialBook.content || '')

  const [quality, setQuality] = useState('medium')
  const [apiKey, setApiKey] = useState('')
  const [imageLoading, setImageLoading] = useState(false)

  const [coverImageUrl, setCoverImageUrl] = useState(
    normalizeImageSrc(initialBook.coverImageUrl || initialBook.image)
  )

  const handlePreviewImage = async () => {
    const prompt = `
# 역할
너는 북커버 제작 담당자야.

# 지침
- 북커버의 앞면 표지만을 보여줄 것
- 전문적인 북커버 디자인, 높은 퀄리티의 일러스트레이션, 두드러진 시각적 표현, 작품에 적합한 안전성
- 이야기의 분위기나 무드를 포함

# 책 정보
- 제목 : "${title}"
- 작가 : "${author}"
- 내용 요약 : ${content}.
`

    try {
      setImageLoading(true)
      setCoverImageUrl('/test_src/loading.gif')

      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-image-2',
          prompt,
          n: 1,
          size: '1024x1536',
          quality,
          output_format: 'png',
        }),
      })

      if (!res.ok) {
        setCoverImageUrl('/test_src/error.png')
        const errData = await res.json().catch(() => ({}))
        const status = res.status

        if (status === 401) throw new Error('API Key가 올바르지 않습니다.')
        if (status === 429) throw new Error('요청 한도를 초과했습니다.')

        throw new Error(errData?.error?.message || 'OpenAI 이미지 생성에 실패했습니다.')
      }

      const data = await res.json()
      const b64Json = data?.data?.[0]?.b64_json

      if (!b64Json) {
        throw new Error('이미지 데이터를 받지 못했습니다.')
      }

      const imageUrl = `data:image/png;base64,${b64Json}`
      setCoverImageUrl(imageUrl)
    } catch (err) {
      console.error(err)
    } finally {
      setImageLoading(false)
    }
  }

  const handleSubmit = () => {
    onSubmit({
      title,
      author,
      content,
      coverImageUrl: getSavableImageUrl(coverImageUrl),
    })
  }

  return (
    <section className="create-write-page">
      <h2 className="create-write-title">도서 정보 수정</h2>

      <div className="create-write-layout">
        <div className="create-write-form">
          <InputInfo
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            content={content}
            setContent={setContent}
          />

          <UpdateImageControls
            apiKey={apiKey}
            setApiKey={setApiKey}
            quality={quality}
            setQuality={setQuality}
            loading={imageLoading}
            onPreview={handlePreviewImage}
            onSubmit={handleSubmit}
            onCancel={onCancel}
          />
        </div>

        <UpdatePreviewCard
          coverImageUrl={coverImageUrl}
          title={title}
          quality={quality}
        />
      </div>
    </section>
  )
}

export default UpdateForm