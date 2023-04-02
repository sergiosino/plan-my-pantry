import { useState } from 'react'
import debounce from 'just-debounce-it'

export function useSearch () {
  const [search, setSearch] = useState('')

  const debouncedSearch = debounce(text => {
    setSearch(text)
  }, 300)

  return {
    search,
    setSearch: debouncedSearch
  }
}
