/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import ScrollBar from 'react-scrollbars-custom';
import Author from '../message-author';
import Messages from '../../chat/messages';
import SubmitMessage from '../../chat/Submitmessage/SubmitMessage';
import { dataMassages1 } from '../../../services/chat-controller/testFetch';

import {
  Content,
  ContentWrapper,
  Header,
  ModalChatMessageWrapper,
  ModalChatOpen,
  ModalChatWrapper,
  SubmitMessageWrap,
} from './styles';

const scrollBarStyles = { width: '100%', height: '100%', paddingRight: 35 };

const ModalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const switchModalStatus = () => {
    setIsOpen(!isOpen);
  };
  const renderMessages = () => dataMassages1.map((el) => {
    if (el.username === 'bogdan13') {
      return (
        <ModalChatMessageWrapper key={el.idMassage}>
          <Messages messages={el.message} messagesType="our" date={el.persistDate} />
          <Author img={el.userSenderImage} name={el.username} />
        </ModalChatMessageWrapper>
      );
    }
    return (
      <ModalChatMessageWrapper key={el.idMassage}>
        <Author img={el.userSenderImage} name={el.username} />
        <Messages messages={el.message} messagesType="their" date={el.persistDate} />
      </ModalChatMessageWrapper>
    );
  });
  return (
    <ModalChatWrapper isOpen={isOpen}>
      <ContentWrapper isOpen={isOpen}>
        <Header>Чат JMSN</Header>
        <Content>
          <ScrollBar style={scrollBarStyles}>{renderMessages()}</ScrollBar>
        </Content>
        <SubmitMessageWrap>
          <SubmitMessage onSubmitMessage={(mess) => console.log(mess)} />
        </SubmitMessageWrap>
      </ContentWrapper>
      <ModalChatOpen onClick={switchModalStatus} isOpen={isOpen} />
    </ModalChatWrapper>
  );
};

export default ModalChat;
