/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SmoothCollapse from 'react-smooth-collapse';
import styled from 'styled-components';
import { IDataPost } from '../../../types/post';
import IComment from '../../../types/comment';

import foto from '../../../img/userFoto.png';

import UserInfo from '../common/UserInfo';
import ActionIcon from '../common/ActionIcon';
import ShowMoreBtn from '../common/ShowMoreBtn';
import Comments from '../blockComments/Comments';

type Props = {
  postData: IDataPost;
  getPostsByTag: (tagName: string) => void;
};

const NewsItem: React.FC<Props> = ({ postData, getPostsByTag }) => {
  const { post, comments, loading, error } = postData;
  const { id, firstName, lastName, avatar, persistDate, commentAmount, shareAmount, likeAmount, bookmarkAmount, title, text, media, tags } = post;
  const [showContent, setShowContent] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const renderTags = (): JSX.Element =>
    (
      <TagsList>
        {tags?.map((tag) =>
          (
            <TagItem
              key={tag.id}
              onClick={(): void =>
                getPostsByTag(tag.text)}
            >
              {`#${tag.text} `}
            </TagItem>
          ))}
      </TagsList>
    );

  return (
    <Container>
      <NewsHeader>
        <UserInfo avatar={foto} firstName={firstName} lastName={lastName} date={persistDate} />
        <ActionsWrapper>
          <ActionButton>
            <ActionIcon name="bookmark" />
            {bookmarkAmount || 0}
          </ActionButton>
          <ActionButton>
            <ActionIcon name="like" />
            {likeAmount || 0}
          </ActionButton>
          <ActionButton
            onClick={(): void => {
              setShowComments((prev) =>
                !prev);
            }}
          >
            <ActionIcon name="comments" />
            {commentAmount || 0}
          </ActionButton>
          <ActionButton>
            <ActionIcon name="share" />
            {shareAmount || 0}
          </ActionButton>
        </ActionsWrapper>
      </NewsHeader>

      <NewsContent>
        <NewsTitle>{title}</NewsTitle>

        <SmoothCollapse expanded={showContent} collapsedHeight="300px">
          <NewsImage src="https://vecherka74.ru/uploads/posts/2017-03/1489665471_fcq3yav1a3o.jpg" />
          <Article>
            {text}
          </Article>
        </SmoothCollapse>

        <ShowMoreBtn
          changeIcon={showContent}
          heightHandler={(): void =>
            setShowContent((prev) =>
              !prev)}
        />
      </NewsContent>
      {renderTags()}
      <SmoothCollapse expanded={showComments}>
        <Comments id={id} comments={comments} loading={loading} error={error} />
      </SmoothCollapse>

    </Container>
  );
};

export default NewsItem;

const Container = styled.section`
  padding: 50px 0 45px 0;
  border-bottom: 1px solid #515151;
  `;

const NewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100px;
  margin-bottom: 30px;
`;

const ActionsWrapper = styled.div`
  width: 324px;
  margin-left: auto;  
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  min-width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 160.9%;
  color: #000000;
  transition: 0.1s;
  &:hover,
  &:active,
  &:focus {
    transform: scale(1.05);
    color: #ffb11b;    
  }
  &: focus {
    outline: none;
  }
`;

const NewsContent = styled.article`
  position: relative;
  width: 100%;
  padding-right: 82px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;
  max-height: auto;
    color: #000000;   
`;

const NewsTitle = styled.div`
  margin: 0 auto 20px 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 160%;
`;

const NewsImage = styled.img`
  display: block;
  border-radius: 5px;
  width: 100%;
  object-fit: cover;
  margin-bottom: 25px;
  box-shadow: 1px 1px 8px 0px #d5d2d2;
`;

const Article = styled(ReactMarkdown)`
  width: 100%;
  font-size: 16px;
  line-height: 165%;
  text-align: justify;`;

const TagsList = styled.ul`
  margin: 30px 0 0 0;
  padding: 0;
  display: flex;
  min-width: 175px;
  min-height: 30px;
  align-content: center;
  font-size: 16px;
  line-height: 165%;
`;

const TagItem = styled.li`
  list-style-type: none;
  color: #000;
  cursor: pointer;
  &:hover, &:active {
    transform: scale(1.05);
    color: #ffb11b;    
  }
  &: focus {
    outline: none;
  }
`;
