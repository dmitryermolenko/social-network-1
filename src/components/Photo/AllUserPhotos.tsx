import React, { useEffect, useState, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Element } from 'react-scroll';
import allPhotoItems from './funcs/allPhotoItems';
import createImagePhoto from './funcs/createImage';

import { RootState } from '../../redux-toolkit/store';
import { loadImages, resetImages } from '../../redux-toolkit/imagesSlice';
import ModalLinkInput from '../../common/modalLinkInput';
import SectionHeader from '../../common/sectionHeader';
import LoadPhotoInput from './LoadPhotoInput';
import { GridContainer, LinkArrow } from './styles';

const mapStateToProps = (state: RootState) =>
  ({
    images: state.image.images,
    loading: state.image.loading,
    error: state.image.error,
    currentUserId: state.currentUser.data?.userId,
  });

const mapDispatchToProps = {
  loadImages: (userId: number) =>
    loadImages({ userId, limit: 15, offset: 0 }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps & { userId: number; isCurrentUser: boolean };

const AllUserPhotos: React.FC<Props> = ({
  loadImages: _loadImages,
  isCurrentUser,
  currentUserId,
  userId,
  images,
  loading,
  error,
}) => {
  const [isCreateImageModalOpen, setCreateImageModalOpen] = useState(false);
  useEffect(() => {
    resetImages();
    _loadImages(userId);
  }, [_loadImages, userId]);
  const createImage = useCallback(
    async ({ desc, url }: { desc: string; url: string }) => {
      if (currentUserId) {
        await createImagePhoto({ url, description: desc, userId: currentUserId });
        _loadImages(userId);
      }
    },
    [currentUserId, _loadImages, userId],
  );
  return (
    <>
      <SectionHeader headline="Все фотографии">
        <Element name="all" />
        {isCurrentUser ? (
          <LoadPhotoInput onChange={(evt): void => {
            const file = evt.target.files;
            if (file) {
              const reader = new FileReader();

              reader.onload = function () {
                if (typeof reader.result === 'string') {
                  const { result } = reader;
                  createImage({ url: result, desc: 'Test' });
                }
              };
              reader.readAsDataURL(file[0]);
            }
            /* setCreateImageModalOpen(true) */ }}
          />
        ) : undefined}
        <ModalLinkInput
          title={['Ссылка на изображение:', 'Описание:']}
          visible={isCreateImageModalOpen}
          setUnvisible={() =>
            setCreateImageModalOpen(false)}
          onLinkSend={(texts) =>
            createImage({ url: texts[0], desc: texts[1] })}
        />
      </SectionHeader>
      <GridContainer>
        <LinkArrow to="all" duration={500} smooth spy />
        {allPhotoItems(images, loading, error)}
      </GridContainer>
    </>
  );
};

export default connector(AllUserPhotos);
