/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/LoginPage/loginPage';
import Messages from './components/Messages/Messages';
import Main from './components/Main';
import Audio from './components/Audio';
import Friends from './components/Friends';
import VideoPage from './components/VideoPage';
import News from './components/News';
import routes from './routes';
import funcRoutes from './routes/funcsRoutes';
import Bookmarks from './components/Bookmarks';
import Photo from './components/Photo/Photo';
import Group from './components/Group';
import Groups from './components/Groups';
import { loadCurrentUser } from './redux-toolkit/currentUserSlice';

import './App.css';
import { RootState } from './redux-toolkit/store';

const mapDispatchToProps = {
  loadCurrentUser,
};

const mapStateToProps = (state: RootState) =>
  ({
    currentUserModel: state.currentUser,
  });

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const App: React.FC<Props> = ({ loadCurrentUser: _loadCurrentUser, currentUserModel }) => {
  useEffect(() => {
    _loadCurrentUser();
  }, [_loadCurrentUser]);
  return (
    <Switch>
      <Route path={routes.login} component={Login} />
      <Route path={routes.audio} component={Audio} />
      <Route path={routes.friends} component={Friends} />
      <Route path={routes.news} component={News} />
      <Route path={routes.video} component={VideoPage} />
      <Route path={routes.messages} component={Messages} />
      <Route path={routes.bookmarks} component={Bookmarks} />
      <Route path={routes.photo} component={Photo} />
      <Route path={routes.group} exact component={Group} />
      <Route path={routes.groups} exact component={Groups} />
      <Route
        path={routes.main}
        render={() => {
          /*
        Если пользователь заходит по главному адресу, его редиректит
        на его личную страницу "по умолчанию". Если данные юзера ещё не получены
        или он не авторизирован, то мы не выводим ничего.
        На будущее: можно сделать, что, если пользователь не авторизирован
        (например, это будет сообщать сервер), то выкидывать его на страницу с авторизацией
        */
          if (currentUserModel?.data) {
            return <Redirect to={funcRoutes.mainWithId(currentUserModel?.data.userId)} />;
          }
          if (currentUserModel?.error) {
            alert('Ошибка при загрузке текущего пользователя. Возврат на страницу с логином');
            return <Redirect to={routes.login} />;
          }
          return null;
        }}
        exact
      />
      <Route
        path={routes.mainWithId}
        render={({ match }) => {
          const { id } = match.params;
          return <Main userId={id} />;
        }}
        exact
      />
    </Switch>
  );
};

export default connector(App);
