// eslint-disable-next-line
import React, { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loadUser, resetUser } from '../../redux-toolkit/userSlice';
import { loadPostsByUser } from '../../redux-toolkit/postsSlice';
import { RootState } from '../../redux-toolkit/store';
import Header from '../../common/header';
import PageWrapper from '../../common/pageWrapper';
import { MainContainer } from '../../common/styledComponents';
import UserInfoHeader from './UserInfoHeader';
import Wall from './Wall';
import ErrorBlock from '../../common/errorBlock';
import LoadingBlock from '../../common/loadingBlock';
import { StyledLoadingWrapped } from './styled';

const mapStateToProps = (state: RootState) =>
  ({
    userModel: state.user,
    currentUserModel: state.currentUser,
  });

const mapDispatch = {
  loadUser,
  loadPostsByUser,
  resetUser,
};
const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & { userId: number };

const Main: React.FC<Props> = ({
  loadUser: _loadUser,
  loadPostsByUser: _loadPostsByUser,
  resetUser: _resetUser,
  userModel,
  currentUserModel,
  userId,
}) => {
  const currentUserId = currentUserModel.data?.userId;
  const isCurrentUserDisplayed = Number(userId) === currentUserId;
  let showingUser = userModel;
  if (isCurrentUserDisplayed) {
    /* Решаем, кого выводить на экран - текущего пользователя, если idшники совпадают
    или пользователя, который загружен */
    showingUser = currentUserModel;
  }
  useEffect(() => {
    _loadUser(userId);
    _loadPostsByUser(userId);
    return () => {
      _resetUser();
    };
  }, [_loadUser, _loadPostsByUser, _resetUser, userId]);
  const renderContent = () => {
    if (showingUser?.data) {
      return (
        <>
          <UserInfoHeader user={showingUser?.data} />
          <Wall user={showingUser?.data} />
        </>
      );
    }
    if (showingUser?.loading) {
      return <StyledLoadingWrapped><LoadingBlock /></StyledLoadingWrapped>;
    }
    return <ErrorBlock errorMessage={showingUser?.error?.message} />;
  };
  return (
    <>
      <Header />
      <MainContainer>
        <PageWrapper messages={false}>{renderContent()}</PageWrapper>
      </MainContainer>
    </>
  );
};

export default connector(Main);
