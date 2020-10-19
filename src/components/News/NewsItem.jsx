/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/icons/mock-avatar.svg';
import favorite from '../../img/icons/favorite.svg';
import like from '../../img/icons/like.svg';
import comment from '../../img/icons/comment.svg';
import repost from '../../img/icons/repost.svg';
import more from '../../img/icons/more.svg';
import moreUp from '../../img/icons/moreUp.svg';

export default function NewsItem(props) {
  const { item } = props;
  const {
    title,
    img,
    text,
    tags,
    author,
    time,
    favoritesCount,
    likesCount,
    commentsCount,
    repostsCount,
  } = item;

  const [isFullContent, setFullContent] = useState(false);
  const height = isFullContent ? '' : '100px';

  const listTags = tags.map((tag) =>
    (
      <LiItem>
        <TagLink key={tag} href="http://localhost:3000/social-network">
          #
          {tag}
        </TagLink>
      </LiItem>
    ));
  return (
    <Container>
      <NewsHeader>
        <AvatarContainer>
          <AvatarImg src={avatar} alt="Aватар" />
        </AvatarContainer>
        <AuthorContainer>
          <Author>{author}</Author>
          <Time>{time}</Time>
        </AuthorContainer>
        <ActionsContainer>
          <ButtonAction>
            <ActionIcon src={favorite} alt="В избранном" />
            {favoritesCount}
          </ButtonAction>
          <ButtonAction>
            <ActionIcon src={like} alt="Лайки" />
            {likesCount}
          </ButtonAction>
          <ButtonAction>
            <ActionIcon src={comment} alt="Комментарии" />
            {commentsCount}
          </ButtonAction>
          <ButtonAction>
            <ActionIcon src={repost} alt="Репосты" />
            {repostsCount}
          </ButtonAction>
        </ActionsContainer>
      </NewsHeader>
      <NewsTitle>{title}</NewsTitle>
      <div style={{ display: 'flex' }}>
        <NewsContentContainer>
          <NewsImage src={img} alt="" />
          <NewsContent style={{ height }}>{text}</NewsContent>
        </NewsContentContainer>
        <ButtonMore>
          <MoreIcon
            src={isFullContent ? moreUp : more}
            onClick={() =>
              setFullContent(!isFullContent)}
          />
        </ButtonMore>
      </div>

      <NewsTags>{listTags}</NewsTags>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  border-bottom: 1px solid #515151;
`;

const NewsHeader = styled.div`
  display: flex;
  width: 100%;
  min-height: 100px;
  margin-bottom: 50px;
`;

const AvatarContainer = styled.div`
  align-self: center;
  width: 85px;
  border-radius: 50%;
  margin-right: 25px;
`;

const AvatarImg = styled.img`
  display: block;
  width: 85px;
  height: 85px;
  object-fit: cover;
`;

const AuthorContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
`;

const Author = styled.span`
  display: block;
  
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  text-align: left;
  margin-bottom: 5px;
`;

const Time = styled.span`
  display: block;
  
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #515151;
`;
const ActionsContainer = styled.div`
  align-self: center;
  margin-left: auto;
  margin-right: 10px;
  flex-grow: 2;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
`;

const ButtonAction = styled.button`
  margin-left: 65px;
  display: flex;
  
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 160.9%;
  color: #000000;
  width: 30px;
  height: 30px;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
  transition: 0.1s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ActionIcon = styled.img`
  margin-right: 10px;
`;

const NewsTitle = styled.div`
  display: block;
  min-height: 40px;
  margin-bottom: 20px;
  text-align: left;
  margin-right: auto;
  font-weight: 600;
  font-size: 20px;
  line-height: 160%;
`;

const NewsImage = styled.img`
  display: block;
  border-radius: 15px;
  width: 100%;
  object-fit: cover;
  margin-bottom: 45px;
  margin-right: auto;
`;

const NewsContentContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
  width: 735px;
`;

const NewsContent = styled.span`
  overflow: hidden;
  color: #000000;
  display: block;
  min-width: 100px;
  max-width: 705px;
  font-size: 16px;
  line-height: 165%;
  margin-right: 20px;
  text-align: justify;
`;

const ButtonMore = styled.button`
  align-self: flex-end;
  width: 35px;
  height: 35px;
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  padding: 0;
  margin-bottom: 30px;
  margin-left: 15px;
`;

const MoreIcon = styled.img`
  transition: 0.1s;
  &:hover {
    transform: scale(1.05);
  }
`;

const NewsTags = styled.span`
  display: flex;
  min-width: 175px;
  min-height: 30px;
  align-content: center;
  font-size: 16px;
  line-height: 165%;
`;

const TagLink = styled.a`
  color: #000;
`;

const LiItem = styled.li`
  list-style-type: none;
  margin-left: 5px;
`;
