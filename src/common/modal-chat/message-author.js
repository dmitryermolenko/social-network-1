import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: 60px;
  height: fit-content;
  cursor: pointer;
  &:hover div {
    color: #bf861a;
  }
`;

const UserImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.div`
  color: #000000;
  font-size: 12px;
  font-weight: 500;
  
  text-align: center;
`;

// нужно добавить ссылку на страницу пользователя от роутера
const MessageAuthor = ({ img, name }) =>
  (
    <Wrapper>
      <UserImg src={img} />
      <UserName>{name}</UserName>
    </Wrapper>
  );

export default MessageAuthor;

MessageAuthor.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};

MessageAuthor.defaultProps = {
  img: null,
  name: null,
};
