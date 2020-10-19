import styled from 'styled-components';
import { Form } from 'formik';
import { mainColor, divideColorStrong } from '../../../colors.module';

export const InputName = styled.input<{ $isError: boolean }>`
  margin-left: 0;
  margin-top: 32px;
  margin-bottom: 20px;
  width: 100%;
  border: none;
  border-radius: 5px;
  border-bottom:${
  ({ $isError }) =>
    ($isError
      ? '1px solid red'
      : '1px solid #b3b3b3')
};
  outline: none !important;
  font-size: 24px;
`;

export const InputText = styled.textarea<{ $isError: boolean }>`
  margin-left: 0;
  margin-top: 42px;
  width: 100%;
  border-radius: 5px;
  border: ${
  ({ $isError }) =>
    ($isError
      ? '1px solid red;'
      : '1px solid #b2b2b2;')
};
  outline: none !important;
  font-size: 16px;
  resize: none;
`;

export const ArticleStyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  position: relative;
  transition: 1s;
  color: black;
`;

export const ArticleButton = styled.button`
  width: 331px;
  height: 67px;
  margin-top: 100px;
  background: #ffb11b;
  border-radius: 15px;
  border: none;
  font-family: Montserrat, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: 0.065em;
  color: #000000;
  &:hover {
    cursor: pointer;
  }
`;

export const ErrorLine = styled.div`
  color: red;
`;

export const MediaBlockWrapped = styled.div`
  height: 150px;
  width: 150px;
  overflow: hidden;
  box-shadow:1px 1px 7px ${divideColorStrong};
  padding: 3px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: -5px;
  top: -5px;
  padding: 5px;
  border: none;
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.2));
  background-color: ${mainColor};
  border-radius: 50%;
  z-index: 100;
`;

export const CloseButtonImg = styled.img`
  width: 100%;
  heigth: 100%;
  object-fit: contain;
  transform: rotate(45deg);
`;

export const MediaContainerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0;
  & > * {
    margin-left: 15px;
    margin-bottom: 15px;
  }
`;
