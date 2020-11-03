// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import __ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import album from '../../common/img/png/album5.png';
import pic from '../../common/img/png/pic.png';
import Deck from './AudioSlider/Deck';
import search from '../../common/img/icons/musicSearch.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import backArrow from '../../common/img/icons/playlistarrowback.svg';
import nextArrow from '../../common/img/icons/playlistarrownext.svg';
import { TypeDispatch } from '../../redux-toolkit/store';
import { TypeRootReducer } from '../../redux-toolkit/rootReducer';
import {
  allAudiosAction,
  friendsAudioAction,
  myAudiosAction,
} from '../../redux-toolkit/audios/allAudiosSlice';
import { rejected } from '../../constants/fetchState';
import IAllAudios from '../../typesInterfaces/IAllAudios';

const Main = styled.div`
  //width: 1300px;
  //height:1000vh;
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
`;

const ButtonsArea = styled.div`
  display: flex;
  margin-top: 250px;
`;

// Для кнопок Моя музыка и т.д.

const SearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  height: 130px;
  max-width: 1000px;
  margin: 60px auto 80px auto;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  align-items: center;
  input {
    border: none;
    outline: none;
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: text;
    }
  }
`;

const PlayListArea = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    color: black;
    padding-bottom: 50px;
  }
  div {
    display: flex;
    div {
      div {
        div {
          img {
            width: 113px;
            height: 113px;
            object-fit: cover;
            border-radius: 20px;
          }
          p {
            color: black;
            text-align: left;
            padding-left: 50px;
          }
        }
      }
    }
  }
`;
const SongsArea = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  p {
    font-size: 15px;
    color: black;
    padding: 0;
    margin: 0;
  }
  h4,
  h3 {
    color: black;
    padding: 0;
    margin: 0;
  }
  ul {
    width: 900px;
    max-height: 900px;
    overflow: scroll;
    ::-webkit-scrollbar {
      /* chrome based */
      width: 0; /* ширина scrollbar */
      background: transparent; /* опционально */
    }
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 50px;
    }
  }
`;
const Next = styled.button`
  background: none;
  border: none;
  background-image: url(${nextArrow});
  position: absolute;
  left: 95%;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  margin-left: 70px;
  margin-top: 40px;
  cursor: pointer;
`;
const Prev = styled.button`
  background: none;
  border: none;
  background-image: url(${backArrow});
  position: absolute;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  margin-left: -64px;
  margin-top: 40px;
  cursor: pointer;
`;

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

// slick arrows and settings area
interface ISlickOnClick {
  onClick?: () => void;
}

const SampleNextArrow = ({ onClick }: ISlickOnClick) =>
  <Next onClick={onClick} />;
const SamplePrevArrow = ({ onClick }: ISlickOnClick) =>
  <Prev onClick={onClick} />;
const settings = {
  loop: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

// end

const Audio: React.FC = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  const dispatch: TypeDispatch = useDispatch();
  const objAudiosState = useSelector(({ allAudiosReducer }: TypeRootReducer) =>
    allAudiosReducer);

  useEffect(() => {
    if (objAudiosState.loading.endsWith(rejected)) {
      message.error(objAudiosState.msgFetchState);
    }
  }, [objAudiosState.loading, objAudiosState.msgFetchState]);

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
  }, [dispatch]);

  // const songsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const songsItems = objAudiosState.length > 0 &&
  // objAudiosState.map(({ id, icon, author, name }) => (
  const songsItems = objAudiosState
    && objAudiosState.allAudios.length > 0
    && objAudiosState.allAudios.map(({ icon, author, name, id, length }: IAllAudios) => {
      const timeAudio = (sec: number): string => {
        if (sec === null) {
          return sec;
        }
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes}:${seconds}`;
      };
      console.log('length', length, typeof length);
      return (
        <li key={id}>
          <LeftSide>
            <div>
              <img src={pic || icon} alt="icon" title="icon" />
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
      );
    });

  const ListFriends = objAudiosState
    && objAudiosState.friends.length > 0
    && objAudiosState.friends.map(({ firstName, lastName, userId, status, avatar, aboutMe }: any) =>
      (
        <li key={userId}>
          <LeftSide onClick={() =>
            console.log('Открыть список аудио')}
          >
            <div>
              <img src={pic || avatar} alt="icon" title="icon" />
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

  const chooseCategoryAudiosOnClick = (argCategoryAudio: string) =>
    async (): Promise<any> => {
    // this.setState((prev: any): any => ({ [argCategoryAudio]: !prev[argCategoryAudio] }));
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

  interface IBtnCategAudio {
    type?: string;
    onClick?: (arg?: string) => void;
    selected?: boolean;
  }

  const BtnCategAudio = styled.button<IBtnCategAudio>`
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

  return (
    <Main>
      <SliderContainer>
        <Deck />
      </SliderContainer>
      <ButtonsArea>
        <BtnCategAudio
          type="button"
          onClick={chooseCategoryAudiosOnClick('myAudios')}
          selected={objCategoryAudios.myAudios}
        >
          Моя музыка
        </BtnCategAudio>
        <BtnCategAudio
          type="button"
          onClick={chooseCategoryAudiosOnClick('allAudios')}
          selected={objCategoryAudios.allAudios}
        >
          Вся музыка
        </BtnCategAudio>
        <BtnCategAudio
          type="button"
          onClick={chooseCategoryAudiosOnClick('friendsAudios')}
          selected={objCategoryAudios.friendsAudios}
        >
          Музыка друзей
        </BtnCategAudio>
      </ButtonsArea>
      <SearchArea>
        <input type="text" placeholder="Начните поиск музыки..." />
        <img src={search} alt="" />
      </SearchArea>
      <PlayListArea>
        <h3>Плейлисты</h3>
        <Slider {...settings}>
          {arr.map((el) =>
            (
              <div key={__.uniqueId()}>
                <img src={album} alt="" />
                <p>{el}</p>
              </div>
            ))}
        </Slider>
      </PlayListArea>
      <SongsArea>
        <ul>{objCategoryAudios.friendsAudios ? ListFriends : songsItems}</ul>
      </SongsArea>
    </Main>
  );
};

export default Audio;

// SampleNextArrow.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };
//
// SamplePrevArrow.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };
