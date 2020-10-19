/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import CommentsListItem from './CommentsListItem';

export default function CommentsList(props) {
  const { data } = props;
  return (
    <Container>
      {data.map((item) =>
        (
          <CommentsListItem
          // API отстутствует, временно key формируем так.
          // Когда с сервера будет приходить Id, заменить на него
            key={item.author + new Date().toLocaleDateString()}
            data={item}
          />
        ))}
    </Container>
  );
}

const Container = styled.div`
  height: 210px;
`;
