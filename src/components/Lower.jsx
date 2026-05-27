import React, { useState } from 'react'

function Lower() {
  const [activePopup, setActivePopup] = useState(null)

  const handleOpen = (type) => {
    setActivePopup(type)
  }

  const handleClose = () => {
    setActivePopup(null)
  }

  return (
    <>
      <footer className="lower-footer">
        <div className="lower-content">
          <span>(주)케이티에이블2조</span>
          <button type="button" className="lower-link" onClick={() => handleOpen('terms')}>
            이용약관
          </button>
          <button type="button" className="lower-link" onClick={() => handleOpen('creator')}>
            제작자
          </button>
        </div>
      </footer>

      {activePopup && (
        <div className="lower-modal-overlay" onClick={handleClose}>
          <section className="lower-modal" onClick={(e) => e.stopPropagation()}>
            <header className="lower-modal-header">
              <h3>{activePopup === 'terms' ? '이용약관' : '제작자'}</h3>
              <button type="button" className="lower-modal-close" onClick={handleClose}>
                ✕
              </button>
            </header>
            <div className="lower-modal-body">
              {activePopup === 'terms' ? (
                <>
                  <p><strong>Book Archive - 도서관리 시스템</strong>은 React와 json-server 기반의 학습용 도서관리 앱입니다.</p>
                  <p>이 앱은 도서 등록, 조회, 검색, 수정, 삭제를 지원하며, 표지 이미지 미리보기와 이미지 재생성 기능을 포함합니다.</p>
                  <p>주요 기능:</p>
                  <ul>
                    <li>도서 목록 조회 및 상세 보기</li>
                    <li>제목/작가 검색</li>
                    <li>도서 등록, 수정, 삭제</li>
                    <li>이미지 미리보기 및 OpenAI 이미지 생성</li>
                    <li>좋아요 및 조회수 기능</li>
                    <li>빈 상태 안내(등록된 도서 없음, 검색 결과 없음)</li>
                  </ul>
                  <p>기술 스택:</p>
                  <ul>
                    <li>React, Vite</li>
                    <li>React Router DOM</li>
                    <li>Fetch API</li>
                    <li>json-server</li>
                    <li>OpenAI Images API</li>
                    <li>CSS</li>
                  </ul>
                  <p>실행 방법:</p>
                  <ul>
                    <li><code>npm install</code></li>
                    <li><code>npx json-server --watch db.json --port 3000</code></li>
                    <li><code>npm run dev</code></li>
                  </ul>
                  <p>본 서비스는 학습 및 데모용이며, 실제 상용 서비스가 아닙니다. 외부 API 키와 데이터는 클라이언트 환경에서 별도 관리됩니다.</p>
                </>
              ) : (
                <>
                    <p>이성민: 팀장, PM/기획, 타임키퍼</p>
                    <p>정휘재: 서기, 스타일링</p>
                    <p>한현우: UI/레이아웃</p>
                    <p>오승진: 메인CRUD개발</p>
                    <p>안인우: UI/레이아웃</p>
                    <p>김민중: 스타일링</p>
                    <p>박찬웅: OpenAI연동, CRUD</p>
                    <p>박시우: 발표, 문서, CRUD</p>
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default Lower
