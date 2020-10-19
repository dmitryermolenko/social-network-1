import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'swiper/swiper.scss';
import { uniqueId } from 'lodash';
import Slider from '../../common/slider/Slider';
import StyledButton from '../../common/button/Button';
import arrowNotFilled from '../../common/img/icons/arr_left.svg';
import PageWrapper from '../../common/pageWrapper';
import SectionHeader from '../../common/sectionHeader';
import VideoItem from './VideoItem';
import OpenedVideo from './OpenedVideo';

const ComponentWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
  background: #ffffff;
  font-family: 'Montserrat', sans-serif;
  border-radius: 15px;
  padding: 114px 114px 114px 91px;
  margin-top: 275px;
  position: relative;
`;

const PageMarker = styled.h2`
  margin: 0;
  left: 90px;
  top: -91px;
  padding: 58px 77px;
  position: absolute;
  border-radius: 15px;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  background: #ffb11b;
  color: black;
`;

const MyVideos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 63px;
`;

const PopulerVideos = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PopularVideosItemWrapper = styled.div`
  flex-shrink: 0;
  margin-bottom: 48px;
  flex-basis: 48%;
`;

const PopularVideoList = styled.div`
  flex-wrap: wrap;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.5s;
  max-height: ${({ show }) =>
    (show ? 'auto' : '412px')};
`;

const ShowHideButton = styled.button`
  transition: all 0.2s;
  position: absolute;
  right: -40px;
  content: '';
  border: none;
  height: 25px;
  width: 15px;
  transform: ${({ show }) =>
    (show ? 'rotate(90deg)' : 'rotate(-90deg)')};
  background: #515151;
  mask-image: url(${arrowNotFilled});
  mask-position: center;
  mask-repeat: no-repeat;
  cursor: pointer;
`;

const videoArr = [
  {
    id: 'lTRiuFIWV54',
    name: 'video 1',
  },
  {
    id: '0wDGX0yTRVY',
    name: 'video 2',
  },
  {
    id: 'OKj7HEnNTak',
    name: 'video 3',
  },
  {
    id: '__aFjMPJGC0',
    name: 'video 4',
  },
];

const VideoPage = () => {
  const [showPopupar, setShowPopupar] = useState(false);
  const [videoToShow, setVideoToShow] = useState({
    showVideo: false,
    videoId: '',
  });

  const showVideo = (id) => {
    setVideoToShow({
      showVideo: true,
      videoId: id,
    });
  };

  const hideVideo = () => {
    setVideoToShow({
      showVideo: false,
      videoId: '',
    });
  };

  useEffect(() => {
    if (videoToShow.showVideo) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'unset';
  }, [videoToShow]);

  return (
    <>
      {' '}
      {videoToShow.showVideo ? <OpenedVideo id={videoToShow.videoId} action={hideVideo} /> : null}
      <PageWrapper>
        <ComponentWrapper>
          {' '}
          <PageMarker>Видеозаписи</PageMarker>
          <MyVideos>
            <SectionHeader headline="Мои видео">
              <StyledButton>Добавить</StyledButton>
            </SectionHeader>
            <Slider spaceBetween={52} margin={50} slidesToShow={2} loop="loop">
              {videoArr.map((obj) =>
                (
                  <VideoItem
                    key={uniqueId()}
                    id={obj.id}
                    name={obj.name}
                    action={() =>
                      showVideo(obj.id)}
                    isPopular={false}
                  />
                ))}
            </Slider>
          </MyVideos>
          <PopulerVideos>
            <SectionHeader headline="Популярные" />
            <PopularVideoList show={showPopupar}>
              <ShowHideButton
                show={showPopupar}
                onClick={() =>
                  setShowPopupar(!showPopupar)}
              />
              {videoArr.map((obj) =>
                (
                  <PopularVideosItemWrapper key={uniqueId()}>
                    <VideoItem
                      id={obj.id}
                      name={obj.name}
                      isPopular
                      action={() =>
                        showVideo(obj.id)}
                    />
                  </PopularVideosItemWrapper>
                ))}
            </PopularVideoList>
          </PopulerVideos>
        </ComponentWrapper>
      </PageWrapper>
    </>
  );
};

export default VideoPage;
