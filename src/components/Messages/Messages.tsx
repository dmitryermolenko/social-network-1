/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';
import ScrollBar from 'react-scrollbars-custom';
import { connect, ConnectedProps } from 'react-redux';
import LoadingBLock from '../../common/loadingBlock/LoadingBlock';
import ErrorBlock from '../../common/errorBlock/ErrorBlock';
import { RootState } from '../../redux-toolkit/store';
import moreOptionSrc from '../../img/icons/chat-more-options.svg';
import MessagesChat from '../../common/chat/messages';
import massagesClass from './Messages.module.scss';
import SubmitMessage from '../../common/chat/submit-message';
import PageSearchInput from '../../common/Inputs/PageSearch';
import PageWrapper from '../../common/pageWrapper';
import * as actions from '../../redux-toolkit/chatSlice';
// import {
//   getChats,
//   getGroupChats,
//   getSingleChats,
//   removeUserFromChat,
//   setTitleGroup,
// } from '../../services/chat-controller';

const scrollBarStyles = { width: '100%', height: '100%', paddingRight: 10 };

const mapStateToProps = (state:RootState) => {
  const { chats, currentChat } = state.chat;
  const { data } = state.user;
  return {
    chats,
    currentChat,
    user: data,
  };
};

const mapDispatch = actions;
const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Messages: React.FC<Props> = ({ chats, currentChat, loadChatsOfUser, loadCurrentChat }) => {
  useEffect(() => {
    if (chats.data.length === 0) {
      loadChatsOfUser();
    }
  }, [chats.data.length, loadChatsOfUser]);

  useEffect(() => {
    if (currentChat.data.length === 0 && chats.data.length !== 0) {
      loadCurrentChat(chats.data[0].id);
    }
  }, [chats.data, currentChat.data.length, loadCurrentChat]);

  const renderMessages = () => {
    if (currentChat.loading) return <LoadingBLock />;
    if (currentChat.error) return <ErrorBlock />;
    return (
      currentChat.data.map((el) => {
        if (el.username === 'bogdan13') {
          return (
            <div className={massagesClass.messageWrapper} key={el.idMassage}>
              <MessagesChat messages={el.message} messagesType="our" date={el.persistDate} />
              <img alt="avatar" src={el.userSenderImage} />
            </div>
          );
        }
        return (
          <div className={massagesClass.messageWrapper} key={el.idMassage}>
            <img alt="avatar" src={el.userSenderImage} />
            <MessagesChat messages={el.message} messagesType="their" date={el.persistDate} />
          </div>
        );
      }));
  };

  const renderChatList = () => {
    if (chats.loading) return <LoadingBLock />;
    if (chats.error) return <ErrorBlock errorMessage={chats.error.message} />;
    return (
      chats.data.map((chat) =>
        (
          <button
            key={chat.id}
            className={massagesClass.selectChatElement}
            type="button"
            onClick={() =>
              loadCurrentChat(chat.id)}
          >
            <img
              alt="avatar"
              src={chat.image}
            />
            <div className={massagesClass.selectChatUserInfo}>
              <span>{chat.title}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </button>
        )));
  };

  return (
    <PageWrapper messages>
      <div className={massagesClass.wrapper}>
        <div className={massagesClass.selectChat}>
          <div className={massagesClass.pageSearchInputWrapper}>
            <PageSearchInput placeholder="Поиск..." />
          </div>
          <div className={massagesClass.selectChatElementsWrapper}>
            {renderChatList()}
          </div>
        </div>

        <div className={massagesClass.contentWrapper}>
          <div className={massagesClass.contentHeader}>
            <img alt="avatar" src="https://st.kp.yandex.net/images/actor_iphone/iphone360_1746394.jpg" />
            <div className={massagesClass.contentUserInfo}>
              <span>Павел Нечаев</span>
              <p>Программист</p>
            </div>
          </div>

          <div className={massagesClass.content}>
            <button
              type="button"
              onClick={() =>
                console.log('menu chats')}
            >
              <img alt="more" src={moreOptionSrc} />
            </button>

            <div className={massagesClass.messagesWrapper}>
              <ScrollBar scrollTop={9999} style={scrollBarStyles}>
                {renderMessages()}
              </ScrollBar>
            </div>

            <div>
              <SubmitMessage />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default connector(Messages);
