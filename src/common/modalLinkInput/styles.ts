import styled from 'styled-components';
import {
  textColor,
  secondaryColor,
} from '../../colors.module';

export const Button = styled.button`
    background-color: ${secondaryColor};
    border: 1px solid ${secondaryColor};
    padding: 5px 10px;
    color: ${textColor};
    border-radius: 5px;
`;

export const Input = styled.input`
    width: 70%;
`;

export const Form = styled.form`
    display: flex;
    justify-content: space-between;
    background-color: white !important;
`;
