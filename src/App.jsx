import React, { useEffect, useState } from 'react'
import './App.css'
import List from './views/List'
import Header from './components/Header'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Home from './views/Home'
import Create from './views/Create'
import Update from './views/Update'

function App() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const bookURL = 'http://localhost:3000/books'

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch(bookURL)
        const data = await res.json()
        setBooks(data)
      } catch (err) {
        console.error(err)
        setError('데이터를 불러오지 못했어요.')
      }
      setLoading(false)
    }

    loadBooks()
  }, [])

  const handleAddBook = async (newBook) => {
    try {
      const res = await fetch(bookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      })
    } catch (err) {
      console.error(err)
    }

    try {
      const res = await fetch(bookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      })
      const saved = await res.json()
      setBooks([saved, ...books])
      navigate('/list')
    } catch (err) {
      console.error(err)
    }
  }


  const handleUpdateBook = async (id, updatedFields) => {
    try {
      const res = await fetch(`${bookURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })
      const updated = await res.json()
      setBooks(books.map((book) => (book.id === id ? updated : book)))
      navigate('/list')
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`${bookURL}/${id}`, {
        method: 'DELETE',
      })
      setBooks(books.filter((book) => book.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleLike = async (id) => {
    try {
      const book = books.find((book) => book.id === id)
      const res = await fetch(`${bookURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: (book.likes || 0) + 1 }),
      })
      const updated = await res.json()
      setBooks(books.map((book) => (book.id === id ? updated : book)))
    } catch (err) {
      console.error(err)
    }
  };

  if (loading)
    return <>
            <Header /> <p>불러오는 중...</p>
          </>;
  
  if (error)
    return <>
            <Header /> <p>에러: {error}</p>
          </>;
  

  // const filteredItems = useMemo(() => {
  //   const q = query.trim().toLowerCase()
  //   if (!q) return sampleItems
  //   return sampleItems.filter((item) => {
  //     return (
  //       item.title.toLowerCase().includes(q) ||
  //       item.subtitle.toLowerCase().includes(q)
  //     )
  //   })
  // }, [query])

  return (
    <div className="app-root">
      <Header />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route
            path="/list"
            element={
              <>
                {/* UI/레이아웃팀 담당: List 검색창 위치/디자인 개선 */}
                <div className="list-search-area">
                  <label className="list-search-box">
                    <span className="search-icon">🔍</span>
                    <input
                      aria-label="search"
                      className="list-search-input"
                      placeholder="책 제목 또는 작가로 검색"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </label>
                </div>
                <List query={query} books={books} onDelete={handleDelete} />
              </>
            }
          />
          <Route path="/create" element={<Create onCreate={handleAddBook}/>} />
          <Route path= "/update/:id" element={<Update bookURL={bookURL} onUpdate={handleUpdateBook} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
