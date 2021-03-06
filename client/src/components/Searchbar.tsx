/* Searchbar Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Image and icon imports
import { FaSearch } from "react-icons/fa";

import styled from "@emotion/styled";

const SearchbarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  width: 200px;
  margin-left: 0.3rem;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  font-size: 12px;
  background-color: ${(props) => props.theme.header.backgroundSecondary};
  border: none;
  border-radius: 2px;
  color: ${(props) => props.theme.header.textPrimary};

  &::placeholder {
    color: ${(props) => props.theme.header.textPrimary};
  }

  &:focus {
    outline: none;
  }
`;

interface SearchbarProps {
  handleSearchNote: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Searchbar component
 * TODO: Add delay before search term is passed down
 */
const Searchbar: React.FC<SearchbarProps> = ({ handleSearchNote }) => {
  return (
    <SearchbarContainer>
      <FaSearch size="13px" />
      <SearchInput
        onChange={(event) => handleSearchNote(event.target.value)}
        placeholder="type to search..."
      />
    </SearchbarContainer>
  );
};

export default Searchbar;
