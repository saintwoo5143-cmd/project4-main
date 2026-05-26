import React from 'react'

export default function UpdateForm({
  title,
  author,
  content,
  setTitle,
  setAuthor,
  setContent,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="update-form">
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">저자</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">상세 내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="button-group">
        <button type="submit" className="btn submit-btn">
          수정 완료
        </button>
        <button type="button" onClick={onCancel} className="btn cancel-btn">
          취소
        </button>
      </div>
    </form>
  )
}
