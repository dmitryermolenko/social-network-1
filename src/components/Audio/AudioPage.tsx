import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { debounce } from 'lodash';
import album from '../../common/img/png/album5.png';
import pic from '../../common/img/png/pic.png';
import Deck from './AudioSlider/Deck';
import PlayListArea from './PlayListArea';
import SearchArea from './SearchArea';
import SongsArea from './SongsArea';
import AddPlayList from './AddPlayList';
import { Next, Prev } from './NavigationButtons';
import search from '../../common/img/icons/musicSearch.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TypeDispatch } from '../../redux-toolkit/store';
import { TypeRootReducer } from '../../redux-toolkit/rootReducer';
import {
  allAudiosAction,
  friendsAudioAction,
  myAudiosAction,
  myPlaylistsAction,
  searchSongsAction,
} from '../../redux-toolkit/audios/allAudiosSlice';
import { rejected, pending } from '../../constants/fetchState';
import IAudios from '../../typesInterfaces/IAudios';

const Main = styled.div`
  //width: 1300px;
  //height: 1000vh;
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
`;

const TitleWrapper = styled.div`
  margin: 0 60px;
`;

const ButtonsArea = styled.div`
  display: flex;
  margin: 250px 60px 0 60px;
`;

// Для кнопок Моя музыка и т.д.

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    margin-right: 27px;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BtnFilterAudio = styled.button<IBtnFilterAudio>`
  border: none;
  background: none;
  padding: 0;
  line-height: 30px;
  outline: none;
  border-bottom: ${(props: any): any =>
    props.selected && '3px solid #FFB11B'};
  &:not(:last-child) {
    margin-right: 51px;
  }
`;

interface IBtnFilterAudio {
  type?: string;
  onClick?: (arg?: string) => void;
  selected?: boolean;
}

// slick arrows and settings area
interface ISlickOnClick {
  onClick?: () => void;
}

const SampleNextArrow = ({ onClick }: ISlickOnClick) =>
  <Next onClick={onClick} />;
const SamplePrevArrow = ({ onClick }: ISlickOnClick) =>
  <Prev onClick={onClick} />;
const settings = {
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  // variableWidth: true, // отрабатывает криво с параметром slidesToShow
};

// end

const Audio: React.FC = () => {
  const dispatch: TypeDispatch = useDispatch();
  const objAudiosState = useSelector(({ allAudiosReducer }: TypeRootReducer) =>
    allAudiosReducer);
  const loaded = objAudiosState.loading.endsWith(pending);
  const playlistsData: Array<Record<string, any>> = objAudiosState.myPlaylists;

  const playlists = playlistsData.map((list) =>
    (
      <div key={list.id}>
        <img src={album || list.image} alt="" />
        <p>{list.name}</p>
      </div>
    ));

  useEffect(() => {
    console.log(objAudiosState);
    if (objAudiosState.loading.endsWith(rejected)) {
      message.error(objAudiosState.msgFetchState);
    }
  }, [objAudiosState, objAudiosState.loading, objAudiosState.msgFetchState]);

  // Вариант типизации для initialStateActiveBtn
  // type TypeInitialStateActiveBtn<T extends string> = { [key in T]: boolean };
  // Виды типизации для initialStateActiveBtn END

  const initialStateActiveBtn: { [key: string]: boolean } = {
    myAudios: true,
    allAudios: false,
    friendsAudios: false,
  };

  const [objCategoryAudios, setChosenCategoryAudios] = useState(initialStateActiveBtn);

  // При переходе на страницу вывод списка audio
  useEffect(() => {
    dispatch(myAudiosAction());
    dispatch(myPlaylistsAction());
  }, [dispatch]);

  const timeAudio = (sec: number): string|number => {
    if (sec === null) {
      return sec;
    }
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds}`;
  };

  const AllAudios = objAudiosState && objAudiosState.allAudios.length > 0
    && objAudiosState.allAudios.map(({ icon, author, name, id, length }: IAudios) =>
      (
        <li key={id}>
          <LeftSide>
            <div>
              <img src={pic || `https://${icon}`} alt="icon" title="icon" />
            </div>
            <div>
              <h3>{author}</h3>
              <p>{name}</p>
            </div>
          </LeftSide>
          <RightSide>
            <h4>{timeAudio(length)}</h4>
          </RightSide>
        </li>
      ));

  const FriendsAudios = objAudiosState
    && objAudiosState.friends.length > 0
    && objAudiosState.friends
      .map(({ firstName, lastName, userId, avatar, aboutMe, status }: any) =>
        (
          <li key={userId}>
            <LeftSide onClick={() => {
              console.log('Открыть список аудио');
            }}
            >
              <div>
                <img src={pic || `https://${avatar}`} alt="avatar" title="avatar" />
              </div>
              <div>
                <h3>{`${firstName} ${lastName}`}</h3>
                <p>{aboutMe}</p>
              </div>
            </LeftSide>
            <RightSide>
              <h4>{status}</h4>
            </RightSide>
          </li>
        ));

  const MyAudios = objAudiosState && objAudiosState.myAudios.length > 0
    && objAudiosState.myAudios.map(({ icon, author, name, id, length }: IAudios) =>
      (
        <li key={id}>
          <LeftSide>
            <div>
              <img src={pic || `https://${icon}`} alt="icon" title="icon" />
            </div>
            <div>
              <h3>{author}</h3>
              <p>{name}</p>
            </div>
          </LeftSide>
          <RightSide>
            <h4>{timeAudio(length)}</h4>
          </RightSide>
        </li>
      ));

  const audiosList = (objCategoryAudios.friendsAudios && FriendsAudios) || (objCategoryAudios.allAudios && AllAudios) || (objCategoryAudios.myAudios && MyAudios) || (loaded && 'Аудиозаписи не найдены');

  const chooseCategoryAudiosOnClick = (argCategoryAudio: string) =>
    async (): Promise<any> => {
      setChosenCategoryAudios({
        [argCategoryAudio]: true,
      });

      if (argCategoryAudio === 'myAudios') {
        return dispatch(myAudiosAction());
      }
      if (argCategoryAudio === 'allAudios') {
        return dispatch(allAudiosAction());
      }
      if (argCategoryAudio === 'friendsAudios') {
        return dispatch(friendsAudioAction());
      }
      return undefined;
    };

  const startSearch = debounce((name) => {
    if (name) dispatch(searchSongsAction(name));
  }, 1000);

  const searchSongs = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    startSearch(value);
  };

  return (
    <Main>
      <SliderContainer>
        <Deck />
      </SliderContainer>
      <ButtonsArea>
        <BtnFilterAudio
          type="button"
          onClick={chooseCategoryAudiosOnClick('myAudios')}
          selected={objCategoryAudios.myAudios}
        >
          Моя музыка
        </BtnFilterAudio>
        <BtnFilterAudio
          type="button"
          onClick={chooseCategoryAudiosOnClick('allAudios')}
          selected={objCategoryAudios.allAudios}
        >
          Вся музыка
        </BtnFilterAudio>
        <BtnFilterAudio
          type="button"
          onClick={chooseCategoryAudiosOnClick('friendsAudios')}
          selected={objCategoryAudios.friendsAudios}
        >
          Музыка друзей
        </BtnFilterAudio>
      </ButtonsArea>
      <SearchArea>
        <input type="text" placeholder="Начните поиск музыки..." onChange={searchSongs} />
        <img src={search} alt="" />
      </SearchArea>
      <PlayListArea>
        <TitleWrapper><h3>Плейлисты</h3></TitleWrapper>
        <Slider {...settings}>
          {playlists}
          <AddPlayList>
            <p>Добавить плейлист</p>
          </AddPlayList>
        </Slider>
      </PlayListArea>
      <SongsArea>
        <ul>{audiosList}</ul>
      </SongsArea>
    </Main>
  );
};

export default Audio;
