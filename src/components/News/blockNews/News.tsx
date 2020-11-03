/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';
import {
  loadAllPosts,
  loadPostsByTag,
  loadCommentsByPost,
} from '../../../redux-toolkit/postsSlice';
import { IDataPost } from '../../../types/post';
import filterNews from './helpers';

import ErrorBlock from '../../../common/errorBlock';
import LoadingBlock from '../../../common/loadingBlock';
import NewsItem from './NewsItem';

import img from '../../../img/icons/search.svg';

interface StateProps {
  data: null | IDataPost[];
  loading: boolean;
  error: null | Error;
}

interface DispatchProps {
  getAllPosts: () => void;
  getPostsByTag: (tagName: string) => void;
  getCommentsByPost: (id: number) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps =>
  ({
    data: state.posts.data,
    loading: state.posts.loading,
    error: state.posts.error,
  });

const mapDispatchToProps = {
  getAllPosts: loadAllPosts,
  getPostsByTag: loadPostsByTag,
  getCommentsByPost: loadCommentsByPost,
};

const News: React.FC<Props> = ({ data, loading, error, getAllPosts, getPostsByTag, getCommentsByPost }) => {
  const searchField = useRef<HTMLInputElement>(null);
  const [showSearchField, setShowSearchField] = useState(false);
  const [actualFilter, setActualFilter] = useState<string>('all');
  const [searchRequest, setSearchRequest] = useState<string | null>(null);

  useEffect(() => {
    getAllPosts();
  }, [actualFilter, getAllPosts]);

  /* const filterNews = (posts: IDataPost[], filter: string): IDataPost[] => {
    if (filter === 'all') return posts;
    if (filter === 'news') {
      return posts.sort((prev, next) =>
        Date.parse(next.post.lastRedactionDate!) - Date.parse(prev.post.lastRedactionDate!)).splice(0, 5);
    }
    if (filter === 'popular') {
      return posts.sort((prev, next) =>
        next.post.likeAmount! - prev.post.likeAmount!).splice(0, 5);
    }
    if (filter === 'request') {
      posts.filter((item) =>
        item.post.title === searchRequest).splice(0, 5);
    }
    return posts.splice(0, 5);
  }; */

  const submitSearchNews = (key: string): void => {
    if (key === 'Enter') {
      setActualFilter('request');
      setSearchRequest(searchField.current?.value!);
      searchField.current!.value = '';
    }
  };

  const renderSearchField = (): JSX.Element => {
    if (showSearchField) {
      return (
        <SearchField
          ref={searchField}
          onBlur={(): void => {
            setShowSearchField((prev) =>
              !prev);
          }}
          onKeyPress={({ key }) =>
            submitSearchNews(key)}
        />
      );
    }

    return (
      <ButtonSearch onClick={(): void => {
        setShowSearchField((prev) =>
          !prev);
      }}
      />
    );
  };

  const renderNews = (): JSX.Element | JSX.Element[] => {
    if (loading) return (<LoadingBlock />);
    if (error) return (<ErrorBlock errorMessage="Error occured with loading posts." />);
    if (!data) return (<ErrorBlock>Ничего не найдено!</ErrorBlock>);
    const newArr = filterNews([...data!], actualFilter, searchRequest);
    if (newArr.length === 0) return (<ErrorBlock>Ничего не найдено!</ErrorBlock>);
    return newArr.map((postData) =>
      <NewsItem key={postData.post.id} postData={postData} />);
  };

  const showComments = (id: number): void => {
    getCommentsByPost(id);
  };

  return (
    <Wrapper>
      <Container>
        <Label>Новости</Label>
        <MenuWrapper>
          <Menu onClick={(event: React.SyntheticEvent): void => {
            const target = event.target as HTMLInputElement;
            setActualFilter(target.name);
          }}
          >
            <MenuItem name="all">Все</MenuItem>
            <MenuItem name="news">Новости</MenuItem>
            <MenuItem name="popular">Интересные</MenuItem>
            <MenuItem name="tags">Теги</MenuItem>
          </Menu>
          {renderSearchField()}
        </MenuWrapper>

        {renderNews()}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #111111;
  padding: 100px;
`;

const Container = styled.div`
  position: relative;
  max-width: 1291px;
  display: flex;
  flex-direction: column;
  padding-left: 95px;
  padding-right: 95px;

  background: #ffffff;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  border-radius: 15px 15px 0px 0px;
`;

const Label = styled.div`
  position: absolute;
  width: 250px;
  height: 75px;
  top: -60px;
  background: #ffb11b;
  border-radius: 15px;
  padding-top: 20px;

  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #000000;
`;

const MenuWrapper = styled.nav`
  min-height: 150px;
  padding: 108px 0 61px 0;
  display: flex;
  justify-content: space-between;

  font-style: normal;
  font-weight: normal;
  color: #515151;
  border-bottom: 1px solid #515151;
`;

const Menu = styled.div`
  display: flex;
`;

const MenuItem = styled.button`
  font-size: 16px;
  line-height: 20px;
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  margin-right: 50px;
  padding: 0;
  padding-bottom: 7px;
  transition: 0.1s;
  &:hover,  {
    transform: scale(1.05);
    border-bottom: 3px solid #ffb11b;
  }
  &:active,
  &:focus {
    outline: none;
    border-bottom: 3px solid #ffb11b;
  }
`;

const ButtonSearch = styled.button`
  width: 35px;
  height: 35px;
  background-color: transparent;
  background: url(${img}) center no-repeat;
  border: 0;
  color: inherit;
  cursor: pointer;
  padding: 0;
  transition: 0.1s;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

const SearchField = styled.input.attrs(() =>
  ({
    type: 'search',
    placeholder: 'Поиск...',
  }))`
height: 46px;
width: 100%;
margin: 0 0 0  24px;
padding: 13px 18px;
background: #FFFFFF;
border: none;
border-bottom: 2px solid #515151;
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 20px;
color: #515151;
&:focus {
  outline: none;
  border-bottom: 3px solid #ffb11b;
}
`;
export default connect(mapStateToProps, mapDispatchToProps)(News);
