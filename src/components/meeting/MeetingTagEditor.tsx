import { useState } from 'react'

type MeetingTagEditorProps = {
  selectedTags: string[]
  suggestedTags: readonly string[]
  onChange: (tags: string[]) => void
}

function MeetingTagEditor({ selectedTags, suggestedTags, onChange }: MeetingTagEditorProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newTag, setNewTag] = useState('')
  const tags = Array.from(new Set([...suggestedTags, ...selectedTags]))

  const toggleTag = (tag: string) => {
    onChange(
      selectedTags.includes(tag)
        ? selectedTags.filter((selectedTag) => selectedTag !== tag)
        : [...selectedTags, tag],
    )
  }

  const addTag = () => {
    const tag = newTag.trim().replace(/^#/, '')
    if (!tag) return

    if (!selectedTags.includes(tag)) onChange([...selectedTags, tag])
    setNewTag('')
    setIsAdding(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag)

        return (
          <button
            key={tag}
            type="button"
            aria-pressed={isSelected}
            className={`h-7.5 rounded-full border px-4 text-[11px] transition-colors ${
              isSelected
                ? 'border-[#851317] bg-[#851317] font-medium text-white'
                : 'border-[#d6d6d6] bg-white text-[#6e6e6e]'
            }`}
            onClick={() => toggleTag(tag)}
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
          className="h-7.5 w-24 rounded-full border border-[#851317] px-3 text-[11px] text-[#121212] outline-none"
          placeholder="#태그"
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
          className="flex size-7.5 items-center justify-center rounded-full border border-[#d6d6d6] bg-white text-[15px] font-medium text-[#851317]"
          onClick={() => setIsAdding(true)}
        >
          ＋
        </button>
      )}
    </div>
  )
}

export default MeetingTagEditor
