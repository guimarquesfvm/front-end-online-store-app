import styled from "styled-components"
import SearchIcon from "./icons/search-icon"
import { StoreContext } from "@/context/StoreContext"
import { useContext } from "react"

const SearchInputWithIcon = styled.div`
  display: flex;
  align-items: center;
  justify-items: space-between;
  width: 238px;

  svg {
    position: relative;
    right: 28px;
  }
`

const TagSearchInput = styled.input`
  padding: 12px 8px;
  background-color: var(--primary-bg);
  font-size: 16px;
  font-weight: 400;
  border: none;

  ::placeholder {
    color: var(--secondary-text);
  }
`

export default function SearchInput() {
  const { setQuery } = useContext(StoreContext)
  return (
    <SearchInputWithIcon>
      <TagSearchInput placeholder="Digite o que você busca" onChange={(e) => setQuery(e.target.value)}/>
      <SearchIcon />
    </SearchInputWithIcon>
  )
}