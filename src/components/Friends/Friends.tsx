/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { uniqueId } from 'lodash';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { RootState } from '../../redux-toolkit/store';
import SingleFriend from './SingleFriend';
import PageSearchInput from '../../common/Inputs/PageSearch';
import { loadFrendsList, setFrendFilter } from '../../redux-toolkit/frendsListSlice';

export const FriendsWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
  background: #ffffff;
  font-family: 'Montserrat', sans-serif;
  border-radius: 15px;
  padding: 114px 114px 114px 91px;
  margin-top: 275px;
  position: relative;
  min-height: 1200px;
`;

export const PageMarker = styled.h2`
  margin: 0;
  left: 90px;
  top: -91px;
  padding: 58px 77px;
  position: absolute;
  border-radius: 15px;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  background: #ffb11b;
`;

const mapStateToProps = (state: RootState) =>
  ({
    frendsList: state.frends.data,
    loading: state.frends.loading,
    error: state.frends.error,
    frendsFilter: state.frends.frendsFilter,
  });

const mapDispatch = { loadFrendsList };
const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Friends: React.FC<Props> = ({
  loadFrendsList: _loadFrendsList,
  frendsList,
  frendsFilter,
  loading,
  error,
}) => {
  useEffect(() => {
    _loadFrendsList(2);
  }, [_loadFrendsList]);
  console.log(frendsList);
  console.log(frendsFilter);

  const dispatch = useDispatch();

  const filterInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFrendFilter(event.target.value.toLowerCase()));
  };

  const userFiltered = () => {
    console.log('userFiltered');
    if (frendsFilter.length > 0 && frendsList !== null) {
      return frendsList.filter(({ firstName, lastName }) => {
        const fullName = `${firstName} ${lastName}`.toLowerCase();
        return fullName.includes(frendsFilter);
      });
    }
    return frendsList;
  };

  const deleteButtonHandler = (event: React.MouseEvent, id: number) => {
    console.log('Удалем пользовател из друзей, его id ', id);
  };

  const messegeButtonHandler = (event: React.MouseEvent, id: number) => {
    console.log(id);
  };

  return (
    <FriendsWrapper>
      <PageMarker>Друзья</PageMarker>
      <PageSearchInput action={filterInputHandler} placeholder="Начните поиск друзей..." />
      {frendsList.length !== 0 ? (
        <div>
          {userFiltered().map((item) =>
            (
              <SingleFriend
                key={uniqueId()}
                deleteButtonHandler={deleteButtonHandler}
                messegeButtonHandler={messegeButtonHandler}
                firstname={item.firstName}
                lastname={item.lastName}
                profesion="No field in api"
                avatarka={item.avatar}
                id={item.userId}
              />
            ))}
        </div>
      ) : (
        <Spin size="large" />
      )}
    </FriendsWrapper>
  );
};

export default connector(Friends);
