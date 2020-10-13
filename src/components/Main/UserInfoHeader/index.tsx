/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../redux-toolkit/store';
import addPhotoIcon from './img/add photo.svg';
import {
  UserInfoHeaderContainer,
  UserInfoAvatar,
  UserInfoNameBlock,
  Avatar,
  AddPhotoBlock,
  AddPhotoIcon,
  UserName,
  UserProfession,
  UserOnlineStatus,
  UserOnlineIcon,
} from '../../../common/styledComponents';
import ModalLinkInput from '../../../common/modalLinkInput';

const mapStateToProps = (state: RootState) => ({
  firstName: state.user.data?.firstName,
  lastName: state.user.data?.lastName,
  avatar: state.user.data?.avatar,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

/* TODO с onlineStatus и lastStatus */
const UserInfoHeader : React.FC<Props> = ({ firstName = '', lastName = '', avatar = '' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onLinkSend = useCallback((link: string) => { alert(link); }, []);
  const profession = 'Программист на HTML';
  const lastStatus = 'online';
  return (
    <UserInfoHeaderContainer>
      <UserInfoAvatar>
        <Avatar img={avatar} />
        <AddPhotoBlock onClick={() => setIsOpen(true)}>
          <AddPhotoIcon src={addPhotoIcon} alt="Изменить аватар" />
        </AddPhotoBlock>
        <ModalLinkInput
          onLinkSend={onLinkSend}
          visible={isOpen}
          setUnvisible={() => setIsOpen(false)}
        />
        { lastStatus === 'online' && <UserOnlineIcon />}
      </UserInfoAvatar>
      <UserInfoNameBlock>
        <UserName>
          {firstName}
          {' '}
          {lastName}
        </UserName>
        <UserProfession>{profession}</UserProfession>
        <UserOnlineStatus>{lastStatus}</UserOnlineStatus>
      </UserInfoNameBlock>
    </UserInfoHeaderContainer>
  );
};

export default connector(UserInfoHeader);
