import { useState } from 'react'
import InputInfo from './InputInfo'
import CreateImageForm from './CreateImageForm'

function CreateForm({ onAddBook,onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

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
          />
        </div>
    </section>
  )
}

export default CreateForm