function InputInfo({ title, setTitle, author, setAuthor, content, setContent }) {
  return (
    <>
      <div className="create-two-columns">
        <label>
          도서 제목
          <input
            value={title}
            placeholder="제목"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          작가 이름
          <input
            value={author}
            placeholder="작가 이름"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
      </div>

      <label>
        내용
        <textarea
          value={content}
          placeholder="내용"
          rows={8}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
    </>
  )
}

export default InputInfo