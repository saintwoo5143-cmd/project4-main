import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

function Home({ books = [] }) {
  const popularBooks = useMemo(() => {
    return [...books]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 6)
  }, [books])

  return (
    <section className="home-book-section">
      <div className="home-book-header">
        <div>
          {/* UI/레이아웃팀 담당: BOOK ARCHIVE 레이블과 타이틀 간격 조정 */}
          <p className="home-label">BOOK ARCHIVE</p>
          <h2 className="home-title">도서목록</h2>
        </div>

        {/* UI/레이아웃팀 담당: 전체 보기 버튼 배치 */}
        <Link to="/list" className="home-view-button">
          전체 보기
        </Link>
      </div>

      {/* UI/레이아웃팀 담당: 홈 설명 문구 가독성 개선 */}
      <p className="home-description">
        좋아요를 많이 받은 책 표지를 먼저 보여주는 인기 도서 목록입니다.
        목록 페이지에서 자세한 정보를 확인할 수 있습니다.
      </p>

      {/* UI/레이아웃팀 담당: 좋아요 순 인기 도서 카드 레이아웃 */}
      <div className="home-book-grid">
        {popularBooks.map((book) => {
        const imageSrc =
  book.coverImageUrl && book.coverImageUrl.trim()
    ? book.coverImageUrl
    : book.image || '/noImage.jpg'
          return (
            <article className="home-book-card" key={book.id}>
              <img
                className="home-book-image"
                src={imageSrc}
                alt={book.title}
              />

              <div className="home-book-card-info">
                <strong>{book.title}</strong>
                <span>작가: {book.author || '작가 미상'}</span>
                <em>좋아요 {book.likes || 0}</em>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Home