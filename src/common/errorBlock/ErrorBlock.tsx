/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import StyledError from './styles';

interface IErrorBlock {
  errorMessage?: string;
}
const ErrorBlock: React.FC<IErrorBlock> = ({ errorMessage }) =>
  (
    <StyledError>
      Error occured with
      {' '}
      {errorMessage }
      !
    </StyledError>
  );

export default ErrorBlock;
