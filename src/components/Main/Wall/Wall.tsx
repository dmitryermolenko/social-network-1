/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';

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
import { ModalInput } from '../../../stories/modalInputLink.stories';

const mapStateToProps = (state: RootState) => ({
  user: state.user.data,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Wall: React.FC<Props> = ({ user }) => (
  <WallContainer>
    <FormStatus statusText={user?.status} />
    <WallInfoBlock>
      <UserAbout
        dateOfBirth={user?.dateOfBirth}
        education={user?.education}
              // profession={  }
        linkSite={user?.linkSite}
        city={user?.city}
        aboutMe={user?.aboutMe}
      />
      <WallInfoUserAbout>
        <InfoHeaderText>Фотографии</InfoHeaderText>
        <InfoPhotoBlock>
          <InfoUserPhoto img={photo1} />
          <InfoUserPhoto img={photo2} />
          <InfoUserPhoto img={photo3} />
          <InfoUserPhoto img={photo4} />
        </InfoPhotoBlock>
      </WallInfoUserAbout>
    </WallInfoBlock>
    <WallCreateArticle user={user} />
    <BlockNotes />
  </WallContainer>
);

export default connector(Wall);
