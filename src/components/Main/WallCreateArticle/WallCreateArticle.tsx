/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useState } from 'react';

import avatar from '../../../img/main photo.png';
import photo from './img/photo.svg';
import music from './img/music.svg';
import video from './img/video.svg';
import note from './img/note.svg';
import dots from './img/dots.svg';
import add from './img/add.svg';

import {
  AvatarMin,
  IconArticle,
  IconCross,
  WallCreateArticleContainer,
  WallCreateArticleHeaderBlock,
  WallCreateArticleHeaderBlockLeft,
  WallCreateArticleHeaderBlockLeftText,
  WallCreateArticleHeaderBlockRight,
  WallCreateArticleIconContainer,
} from '../../../common/styledComponents';
import ArticleForm from '../ArticleForm';
import { IUser } from '../../../types/user';

const renderIcons = () => {
  const icons = [photo, music, video, note, dots];
  return icons.map((el) => <IconArticle img={el} key={el} />);
};

interface IWallCreateArticle {
  user: IUser | null;
}

const WallCreateArticle: React.FC<IWallCreateArticle> = ({ user }) => {
  const [isOpen, setOpen] = useState(false);

  const changeOpen = useCallback(
    () => setOpen(false),
    [setOpen],
  );
  const revertOpen = useCallback(
    () => setOpen((_isOpen) => !_isOpen),
    [setOpen],
  );

  if (!user) {
    return null;
  }

  return (
    <WallCreateArticleContainer>
      <WallCreateArticleHeaderBlock>
        <WallCreateArticleHeaderBlockLeft>
          <AvatarMin img={avatar} />
          <WallCreateArticleHeaderBlockLeftText>
            Напишите заметку или статью...
          </WallCreateArticleHeaderBlockLeftText>
        </WallCreateArticleHeaderBlockLeft>
        <WallCreateArticleHeaderBlockRight>
          <WallCreateArticleIconContainer $isOpen={isOpen}>
            <div>
              <IconCross img={add} onClick={revertOpen} $isOpen={isOpen} />
              {renderIcons()}
            </div>
          </WallCreateArticleIconContainer>
        </WallCreateArticleHeaderBlockRight>
      </WallCreateArticleHeaderBlock>
      <ArticleForm
        isOpen={isOpen}
        changeOpen={changeOpen}
      />
    </WallCreateArticleContainer>
  );
};

export default WallCreateArticle;
