import styled from 'styled-components';

const SearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  height: 130px;
  max-width: 1000px;
  margin: 60px auto 40px auto;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  align-items: center;
  input {
    width: 100%;
    padding: 53px 0;
    border: none;
    outline: none;
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: text;
    }
  }
`;

export default SearchArea;
