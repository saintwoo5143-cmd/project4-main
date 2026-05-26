import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UpdateForm from '../components/UpdateForm'

export default function Update({ bookURL, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadBookDetail() {
      try {
        setLoading(true)
        const res = await fetch(`${bookURL}/${id}`)
        if (!res.ok) throw new Error('책 정보를 가져오지 못했습니다.')
        
        const data = await res.json() 
        setTitle(data.title)
        setAuthor(data.author || '')
        setContent(data.content || '')
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id && bookURL) {
      loadBookDetail()
    }
  }, [id, bookURL])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(Number(id), { title, author, content })
  }

  if (loading) return <p className="loading-text">도서 정보를 불러오는 중입니다...</p>;
  if (error) return <p className="error-text">에러: {error}</p>;

  return (
    <div className="update-container">
      <h2 className="update-title">도서 정보 수정</h2>
      <UpdateForm
        title={title}
        author={author}
        content={content}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setContent={setContent}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/list')}
      />
    </div>
  )
}