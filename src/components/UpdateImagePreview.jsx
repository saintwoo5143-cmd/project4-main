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

function UpdatePreviewCard({ coverImageUrl, title, quality }) {
  const imageSrc = normalizeImageSrc(coverImageUrl)

  return (
    <aside className="create-preview-card">
      <div className="create-preview-image-box">
        <img
          src={imageSrc}
          alt={title || 'book cover'}
        />
      </div>
      <strong>이미지 미리보기</strong>
      <p>선택된 품질: {quality}</p>
      <span>
        수정할 내용을 입력한 뒤 이미지 미리보기를 누르면 표지를 다시 생성할 수 있습니다.
      </span>
    </aside>
  )
}

export default UpdatePreviewCard