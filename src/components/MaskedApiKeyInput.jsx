import { useRef } from 'react'

function maskApiKey(value) {
  if (!value) return ''

  const visibleLength = 7

  if (value.length <= visibleLength) {
    return value
  }

  return `${value.slice(0, visibleLength)}${'*'.repeat(value.length - visibleLength)}`
}

function MaskedApiKeyInput({ value, onChange }) {
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const nextValue = e.target.value

    // 붙여넣기/처음 입력은 그대로 원문 저장
    // 이미 마스킹된 상태에서 추가 입력하는 복잡한 케이스는 아래 onPaste로 처리
    if (!nextValue.includes('*')) {
      onChange(nextValue)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()

    const pasted = e.clipboardData.getData('text')
    onChange(pasted)

    requestAnimationFrame(() => {
      inputRef.current?.blur()
    })
  }

  const handleFocus = () => {
    // 포커스 시 입력 편의를 위해 전체 선택
    requestAnimationFrame(() => {
      inputRef.current?.select()
    })
  }

  return (
    <input
      ref={inputRef}
      value={maskApiKey(value)}
      placeholder="api키"
      onChange={handleChange}
      onPaste={handlePaste}
      onFocus={handleFocus}
      autoComplete="off"
      spellCheck={false}
    />
  )
}

export default MaskedApiKeyInput