import styled from 'styled-components';

const AddPlayList = styled.button`
 background: #FFB11B;
 border-radius: 20px;
 width: 113px !important;
 height: 113px;
 margin: 13px;
 position: relative;
 outline: none;
 border-color: transparent;
 :hover {
   border-color: #ff4e00;
 }
 ::after {
   position: absolute;
   content: '+';
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   font-size: 30px;
 }
 p {
  color: black;
  text-align: center;
  margin-top: 120px;
 }
`;

export default AddPlayList;
