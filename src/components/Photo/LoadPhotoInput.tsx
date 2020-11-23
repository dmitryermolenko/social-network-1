import React from 'react';
import styled from 'styled-components';

interface Props {
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoadPhotoInput: React.FC<Props> = ({ onChange }): JSX.Element =>
  (
    <>
      <FileInput id="file" type="file" onChange={onChange} />
      <Label htmlFor="file">Добавить</Label>
    </>
  );

const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  & + label:hover {
    cursor: pointer;
    box-shadow: 0 0 0 3px #ffffff, 0 0 0 5px #ffb11b;
  }
`;

const Label = styled.label`
  display: block;
  padding: 19px 66px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  border-radius: 15px;
  background: #ffb11b;
  cursor: pointer;
  transition: box-shadow 0.2s ease-out;
`;

export default LoadPhotoInput;
