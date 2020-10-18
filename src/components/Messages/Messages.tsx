/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import ScrollBar from 'react-scrollbars-custom';
import { connect, ConnectedProps } from 'react-redux';
import { Ichat } from '../../types/chat';
import { RootState } from '../../redux-toolkit/store';
import moreOptionSrc from '../../img/icons/chat-more-options.svg';
import massagesClass from './Messages.module.scss';
import SubmitMessage from '../../common/chat/Submitmessage/SubmitMessage';
import PageSearchInput from '../../common/Inputs/PageSearchMasseges/PageSearchInput';
import PageWrapper from '../../common/pageWrapper';
import * as actions from '../../redux-toolkit/chatSlice';
import { onFilterChats, renderchatList, renderMessages } from './helpers';

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
  const { data } = state.currentUser;
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

const Messages: React.FC<Props> = ({
  chats,
  currentChat,
  loadChatsOfUser,
  loadCurrentChat,
  user,
}) => {
  const [filterChats, setFilterChats] = useState<Ichat[]>([]);

  useEffect(() => {
    setFilterChats(chats.data);
  }, [chats.data]);

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

  return (
    <PageWrapper messages>
      <div className={massagesClass.wrapper}>
        <div className={massagesClass.selectChat}>
          <div className={massagesClass.pageSearchInputWrapper}>
            <PageSearchInput placeholder="Поиск..." action={(value) => setFilterChats(onFilterChats(value, chats.data))} />
          </div>
          <ScrollBar scrollTop={9999} style={scrollBarStyles}>
            <div className={massagesClass.selectChatElementsWrapper}>
              {renderchatList(chats, filterChats, loadCurrentChat)}
            </div>
          </ScrollBar>
        </div>

        <div className={massagesClass.contentWrapper}>
          <div className={massagesClass.contentHeader}>
            <img alt="avatar" src="https://st.kp.yandex.net/images/actor_iphone/iphone360_1746394.jpg" />
            <div className={massagesClass.contentUserInfo}>
              <span>{`${user?.firstName} ${user?.lastName}`}</span>
              {/* <p>Программист</p> */}
            </div>
          </div>

          <div className={massagesClass.content}>
            <button className={massagesClass.menu} type="button" onClick={() => console.log('menu chats')}>
              <img alt="more" src={moreOptionSrc} />
            </button>

            <div className={massagesClass.messagesWrapper}>
              <ScrollBar scrollTop={9999} style={scrollBarStyles}>
                {renderMessages(currentChat)}
              </ScrollBar>
            </div>

            <div>
              <SubmitMessage onSubmitMessage={(mess) => console.log(mess)} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default connector(Messages);
