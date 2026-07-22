type TagSelectorProps = {
  selectedTags: string[]
  tags: readonly string[]
  onToggle: (tag: string) => void
}

function TagSelector({ selectedTags, tags, onToggle }: TagSelectorProps) {
  const [customTags, setCustomTags] = useState<string[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newTag, setNewTag] = useState('')
  const allTags = [...tags, ...customTags]

  const addTag = () => {
    const tag = newTag.trim().replace(/^#/, '')
    if (!tag) return
    if (!allTags.includes(tag)) setCustomTags((current) => [...current, tag])
    if (!selectedTags.includes(tag)) onToggle(tag)
    setNewTag('')
    setIsAdding(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {allTags.map((tag) => {
        const isSelected = selectedTags.includes(tag)

        return (
          <button
            key={tag}
            type="button"
            aria-pressed={isSelected}
            className={`rounded-full border px-3.5 py-1.75 text-xs font-medium transition-colors ${
              isSelected
                ? 'border-[#831317] bg-[#831317] text-white'
                : 'border-[#d9d9d9] bg-white text-[#737373]'
            }`}
            onClick={() => onToggle(tag)}
          >
            #{tag}
          </button>
        )
      })}

      {isAdding ? (
        <input
          autoFocus
          value={newTag}
          aria-label="새 태그"
          placeholder="#태그"
          className="h-[30px] w-24 rounded-full border border-[#831317] px-3 text-xs outline-none"
          onChange={(event) => setNewTag(event.target.value)}
          onBlur={addTag}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              addTag()
            }
            if (event.key === 'Escape') {
              setNewTag('')
              setIsAdding(false)
            }
          }}
        />
      ) : (
        <button
          type="button"
          aria-label="태그 추가"
          className="flex size-[30px] items-center justify-center rounded-full border border-dashed border-[#d9d9d9] bg-white text-[15px] text-[#737373]"
          onClick={() => setIsAdding(true)}
        >
          +
        </button>
      )}
    </div>
  )
}

export default TagSelector
import { useState } from 'react'
