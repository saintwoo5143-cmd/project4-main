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
        if (!res.ok) {throw new Error('도서 목록을 불러오지 못했습니다.')}
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

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || '도서 등록에 실패했습니다.')
      }

      const saved = await res.json()
 
      setBooks((prevBooks) => [saved, ...prevBooks])
      navigate('/list')
    } catch (err) {
      console.error(err)
      setError(err.message || '도서 등록에 실패했습니다.')
    }
  }

  const handleUpdateBook = async (id, updatedFields) => {
    try {
      const res = await fetch(`${bookURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      })

      if (!res.ok) {
        throw new Error('도서 수정에 실패했습니다.')
      }

      const updated = await res.json()

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          String(book.id) === String(id) ? updated : book
        )
      )

      navigate('/list')
    } catch (err) {
      console.error(err)
    }
  }

  //이미지 삭제시 undefined 404에러 보완 조치
  const handleDelete = async (id) => {
    try {
      const book = books.find((b) => String(b.id) === String(id))

      // 이미지 서버에 저장된 이미지일 때만 이미지 파일 삭제 요청
      if (book?.coverImageUrl?.includes('/images/')) {
        const filename = book.coverImageUrl.split('/images/')[1]

        if (filename) {
          await fetch(`http://localhost:3001/api/image/${filename}`, {
            method: 'DELETE',
          })
        }
      }

      // json-server에서 도서 삭제
      const res = await fetch(`${bookURL}/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || '삭제에 실패했습니다.')
      }

      // 프론트 상태 갱신
      setBooks((prevBooks) =>
        prevBooks.filter((b) => String(b.id) !== String(id))
      )
    } catch (err) {
      console.error(err)
      setError(err.message || '삭제에 실패했습니다.')
    }
  }

  const handleLike = async (id) => {
    try {
      const book = books.find((book) => String(book.id) === String(id))
      const res = await fetch(`${bookURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: (book.likes || 0) + 1 }),
      })
      if (!res.ok) {throw new Error('반응성에 실패했습니다.')}
      const updated = await res.json()
      setBooks(books.map((book) => (String(book.id) === String(id) ? updated : book)))
    } catch (err) {
      console.error(err)
    }
  };

  const handleView = async (id) => {
    try {
      const book = books.find((book) => String(book.id) === String(id));
      const res = await fetch(`${bookURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ views: (book.views || 0) + 1 }),
      });
      if (!res.ok) {throw new Error('조회수에 실패했습니다.')}
      const updated = await res.json();
      setBooks(books.map((book) => (String(book.id) === String(id) ? updated : book)));
    } catch (err) {
      console.error(err);
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
                <List query={query} books={books} onDelete={handleDelete} onLike={handleLike} onView={handleView} />
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
