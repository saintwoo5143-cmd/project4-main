import { useState } from 'react'
import InputInfo from './InputInfo'
import CreateImageForm from './CreateImageForm'

function CreateForm({ onAddBook,onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  return (
    <section className="create-write-page">
      <h2 className="create-write-title">새글작성</h2>
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
          <CreateImageForm
            title={title}
            author={author}
            content={content}
            onAddBook={onAddBook}
            onCancel={onCancel}
          />
        </div>
      </div>
    </section>
  )
}

export default CreateForm