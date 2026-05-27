import { useState } from 'react'
import InputInfo from './InputInfo'
import CreateImageForm from './CreateImageForm'
import CreatePreviewCard from './CreateImagePreview'

function CreateForm({ onAddBook,onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [quality, setQuality] = useState('medium')
  const [coverImageUrl, setCoverImageUrl] = useState('/test_src/01.png')

  // console.log(onAddBook);
  return (
    <section className="create-write-page">
      <h5 className="create-write-title">새글 생성</h5>
        <div className="create-write-form">
          <h1 className="create-write-title">내용 생성</h1>
          <InputInfo
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            content={content}
            setContent={setContent}
          />
          <h1 className="create-write-title">썸네일 생성</h1>
          <CreateImageForm
            title={title}
            author={author}
            content={content}
            onAddBook={onAddBook}
            onCancel={onCancel}
            quality={quality}
            setQuality={setQuality}
            coverImageUrl={coverImageUrl}
            setCoverImageUrl={setCoverImageUrl}
          />
        </div>
      <CreatePreviewCard coverImageUrl={coverImageUrl} quality={quality}/>
    </section>
  )
}

export default CreateForm