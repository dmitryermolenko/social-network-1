/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { uniqueId } from 'lodash';
import ScrollBar from 'react-scrollbars-custom';
import io from 'socket.io-client';
import Author from '../message-author';
import Messages from '../../chat/messages';
import SubmitMessage from '../../chat/Submitmessage/SubmitMessage';
import { dataMassages1 } from '../../../services/chat-controller/testFetch';
import { renderMessages } from '../../../components/Messages/helpers';
import { IsingleChat } from '../../../types/chat';

import {
  Content,
  ContentWrapper,
  Header,
  ModalChatMessageWrapper,
  ModalChatOpen,
  ModalChatWrapper,
  SubmitMessageWrap,
} from './styles';

const socket = io.connect('https://evening-retreat-56550.herokuapp.com/');

const scrollBarStyles = { width: '100%', height: '100%', paddingRight: 35 };

const ModalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentChatT, setCurrentChatT] = useState<IsingleChat[]>([]);
  const [userName, setUserName] = useState<string | null>('');

  socket.on('message', (message: any) => {
    setCurrentChatT(message);
  });

  useEffect(() => {
    if (sessionStorage.getItem('userName') === null) {
      const username = prompt('Введите ваш ник для чата') || `user-${uniqueId()}`;
      sessionStorage.setItem('userName', username);
      setUserName(username);
      socket.emit('update', '');
    } else {
      setUserName(sessionStorage.getItem('userName'));
      socket.emit('update', '');
    }
  }, []);

  const switchModalStatus = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ModalChatWrapper isOpen={isOpen}>
      <ContentWrapper isOpen={isOpen}>
        <Header>Чат JMSN</Header>
        <Content>
          <ScrollBar style={scrollBarStyles}>{renderMessages(currentChatT, userName)}</ScrollBar>
        </Content>
        <SubmitMessageWrap>
          <SubmitMessage onSubmitMessage={(mess) => socket.emit('message',
            {
              persistDate: Date.now(),
              idMassage: Date.now(),
              message: mess,
              userSenderImage: 'https://img2.freepng.ru/20180331/tfe/kisspng-sticker-smiley-emoticon-stationery-smiley-5abf3186b00ad1.4357598215224794947211.jpg',
              username: userName,
            })}
          />
        </SubmitMessageWrap>
      </ContentWrapper>
      <ModalChatOpen onClick={switchModalStatus} isOpen={isOpen} />
    </ModalChatWrapper>
  );
};

export default ModalChat;
