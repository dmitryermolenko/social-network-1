import React from 'react';
import __ from 'lodash';
import styled from 'styled-components';

import { Link, Element } from 'react-scroll';
import ModalImage from 'react-modal-image';

import arrowIcon from '../../common/img/icons/arr_left.svg';

import PageWrapper from '../../common/pageWrapper';

import Slider from '../../common/slider';
import SliderItemSt from './SliderItem';
import SectionHeader from '../../common/sectionHeader';
import Button from '../../common/button';
import ContentBox from '../../common/contentBox/ContentBox';

import data from './albums';
import AllPhotosGrid from './AllPhotosGrid';

const Item = styled(ModalImage)`
  border-radius: 5px;
  background-color: #efefef;
  position: static;
`;

const sliderItems = data.map((item) =>
  SliderItemSt(item));
const allPhotoItems = data.map((item) =>
  (
    <Item large={item.bigImage} small={item.image} alt={`image#${item.id}`} key={__.uniqueId()} />
  ));

const LinkArrow = styled(Link)`
  mask-image: url(${arrowIcon});
  background-color: #515151;
  position: absolute;
  width: 15px;
  height: 25px;
  transform: rotate(-90deg);
  right: -50px;
  &:hover {
    cursor: pointer;
  }
`;

const Headline = styled.h1`
  position: absolute;
  display: inline-block;
  background: #ffb11b;
  border-radius: 15px;
  padding: 60px 80px;
  top: -90px;
`;

const Photo = () =>
  (
    <PageWrapper>
      <ContentBox>
        <Headline>Фотографии</Headline>
        <SectionHeader headline="Альбомы">
          <Button>Создать</Button>
        </SectionHeader>
        <Slider slidesToShow={3} slidesToScroll={3} spaceBetween={70} loop>
          {sliderItems}
        </Slider>
        <SectionHeader headline="Все фотографии">
          <Element name="all" />
          <Button>Добавить</Button>
        </SectionHeader>
        <AllPhotosGrid gap="44px">
          <LinkArrow to="all" duration={500} smooth spy />
          {allPhotoItems}
        </AllPhotosGrid>
      </ContentBox>
    </PageWrapper>
  );

export default Photo;
