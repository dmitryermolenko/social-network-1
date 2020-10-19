/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
// import { connect, ConnectedProps } from 'react-redux';
// import { RootState } from '../../../redux-toolkit/store';

import photo1 from './img/photo 1.png';
import photo2 from './img/photo 2.png';
import photo3 from './img/photo 3.png';
import photo4 from './img/photo 4.png';

import {
  WallContainer,
  WallInfoBlock,
  InfoPhotoBlock,
  InfoUserPhoto,
  InfoHeaderText,
  WallInfoUserAbout,
} from '../../../common/styledComponents';
import WallCreateArticle from '../WallCreateArticle';
import FormStatus from './FormStatus';
import BlockNotes from '../Articles/blockNotes/BlockNotes';
import UserAbout from '../UserAbout';
import { IUser } from '../../../types/user';
/*
const mapStateToProps = (state: RootState) => ({
  user: state.user.data,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
*/
type Props = { user: IUser }; // PropsFromRedux;

const Wall: React.FC<Props> = ({ user }) =>
  (
    <WallContainer>
      <FormStatus statusText={user?.status} />
      <WallInfoBlock>
        <UserAbout
          dateOfBirth={user?.dateOfBirth}
          education={user?.education}
          profession={user?.profession}
          linkSite={user?.linkSite}
          city={user?.city}
          aboutMe={user?.aboutMe}
        />
        <WallInfoUserAbout>
          <InfoHeaderText>Фотографии</InfoHeaderText>
          <InfoPhotoBlock>
            <InfoUserPhoto small={photo1} medium={photo1} />
            <InfoUserPhoto small={photo2} medium={photo2} />
            <InfoUserPhoto small={photo3} medium={photo3} />
            <InfoUserPhoto small={photo4} medium={photo4} />
          </InfoPhotoBlock>
        </WallInfoUserAbout>
      </WallInfoBlock>
      <WallCreateArticle user={user} />
      <BlockNotes />
    </WallContainer>
  );

export default Wall;
