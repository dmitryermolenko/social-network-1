/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import MediaBlock from './MediaBlock';
import { MediaContainerWrapper } from './styles';

import IMedia from '../../../types/media';

const renderMedia = (media: IMedia[], onDeleteMedia: (index: number) => void) =>
  media.map((mediaItem, index) =>
    (
      <MediaBlock
        media={mediaItem}
        onClose={() =>
          onDeleteMedia(index)}
      />
    ));

interface Props {
    media?: IMedia[];
    onDeleteMedia: (index: number) => void;
}

const MediaContainer: React.FC<Props> = ({ media, onDeleteMedia }) => {
  if (!media?.length) {
    return null;
  }
  return (
    <MediaContainerWrapper>
      {renderMedia(media, onDeleteMedia)}
    </MediaContainerWrapper>
  );
};

export default MediaContainer;
