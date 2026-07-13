type TagSelectorProps = {
  selectedTags: string[]
  tags: readonly string[]
  onToggle: (tag: string) => void
}

function TagSelector({ selectedTags, tags, onToggle }: TagSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
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
    </div>
  )
}

export default TagSelector
