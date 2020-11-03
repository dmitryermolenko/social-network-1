import styled from 'styled-components';

const SongsArea = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #000000;
  margin: 20px auto 0px auto;
  max-width: 1000px;
  p {
    font-size: 15px;
    color: black;
    padding: 0;
    margin: 0;
  }
  h4,
  h3 {
    color: black;
    padding: 0;
    margin: 0;
  }
  ul {
    width: 1000px;
    max-height: 900px;
    overflow: scroll;
    padding-inline-start : 0;
    ::-webkit-scrollbar {
      /* chrome based */
      width: 0; /* ширина scrollbar */
      background: transparent; /* опционально */
    }
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 50px;
    }
  }
`;

export default SongsArea;
