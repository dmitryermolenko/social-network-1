import React from 'react';
import ErrorBlock from '../../common/errorBlock/ErrorBlock';
import MessagesChat from '../../common/chat/messages';
import massagesClass from './Messages.module.scss';
import LoadingBLock from '../../common/loadingBlock/LoadingBlock';
import { Ichat, IsingleChat } from '../../types/chat';
import Author from '../../common/modal-chat/message-author';

type Chats = {
  data: Ichat[];
  loading: boolean;
  error: Error | null;
};

type CurrentChat = {
  data: IsingleChat[];
  loading: boolean;
  error: Error | null;
};

const renderchatList = (
  chats: Chats,
  filterChats: Ichat[],
  loadCurrentChat: (id: number) => void,
): JSX.Element | JSX.Element[] => {
  if (chats.loading) return <LoadingBLock />;
  if (chats.error) return <ErrorBlock errorMessage={chats.error.message} />;
  return filterChats.map((chat) => (
    <button
      key={chat.id}
      className={massagesClass.selectChatElement}
      type="button"
      onClick={() => loadCurrentChat(chat.id)}
    >
      <img alt="avatar" src={chat.image} />
      <div className={massagesClass.selectChatUserInfo}>
        <span>{chat.title}</span>
        <p>{chat.lastMessage}</p>
      </div>
    </button>
  ));
};

const renderMessages = (currentChat: IsingleChat[], username: string | null): any => (
  currentChat.map((el) => {
    if (el.username === username) {
      return (
        <div className={massagesClass.messageWrapper} key={el.idMassage}>
          <MessagesChat messages={el.message} messagesType="our" date={el.persistDate} />
          <Author img={el.userSenderImage} name={el.username} />
        </div>
      );
    }
    return (
      <div className={massagesClass.messageWrapper} key={el.idMassage}>
        <Author img={el.userSenderImage} name={el.username} />
        <MessagesChat messages={el.message} messagesType="their" date={el.persistDate} />
      </div>
    );
  }));

const onFilterChats = (param: string, data: Ichat[]): Ichat[] => {
  if (param === '') return data;
  const filtData = data.filter((el) => {
    const nameChat = el.title.toLowerCase();
    const findStr = param.toLowerCase();
    return nameChat.startsWith(findStr);
  });
  return filtData;
};

export { onFilterChats, renderchatList, renderMessages };
