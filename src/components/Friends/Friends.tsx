import React, { useEffect } from 'react';
import styled from 'styled-components';
import { uniqueId } from 'lodash';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { RootState } from '../../redux-toolkit/store';
import SingleFriend from './SingleFriend';
import PageSearchInput from '../../common/Inputs/PageSearch';
import { loadFriendsList, setFriendFilter } from '../../redux-toolkit/friendsListSlice';

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
    friendsList: state.friends.data,
    loading: state.friends.loading,
    error: state.friends.error,
    friendsFilter: state.friends.friendsFilter,
  });

const mapDispatch = { loadFriendsList };
const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Friends: React.FC<Props> = ({
  loadFriendsList: _loadFriendsList,
  friendsList,
  friendsFilter,
  loading,
  error,
}) => {
  useEffect(() => {
    _loadFriendsList(2);
  }, [_loadFriendsList]);
  console.log(friendsList);
  console.log(friendsFilter);

  const dispatch = useDispatch();

  const filterInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFriendFilter(event.target.value.toLowerCase()));
  };

  const userFiltered = () => {
    console.log('userFiltered');
    if (friendsFilter.length > 0 && friendsList !== null) {
      return friendsList.filter(({ firstName, lastName }) => {
        const fullName = `${firstName} ${lastName}`.toLowerCase();
        return fullName.includes(friendsFilter);
      });
    }
    return friendsList;
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
      {friendsList.length !== 0 ? (
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
