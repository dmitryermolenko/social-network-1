import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import arrowLeft from '../../img/icons/arr_left.svg';
import arrowRigth from '../../img/icons/arr_right.svg';
import 'slick-carousel/slick/slick.css';

import 'swiper/swiper.scss';

const Container = styled.div`
  position: relative;
  padding-bottom: 46px;
  border-bottom: 1px solid #000000;
`;

const Arrow = styled.div<{ left?: boolean }>`
  position: absolute;
  width: 15px;
  height: 25px;
  background-color: #515151;
  mask-image: url(${({ left }) =>
    (left ? arrowLeft : arrowRigth)});
  top: 158px;
  &:hover {
    cursor: pointer;
  }
`;

const SliderWrapper = styled(Slider)<{ spaceBetween: number }>`
  margin: 0 -${({ spaceBetween }) =>
    spaceBetween / 2}px;
`;

interface SliderComp {
  loop?: boolean;
  slidesToScroll?: number;
  slidesToShow?: number;
  slidesPerView?: number;
  margin?: number;
  spaceBetween?: number;
  children: React.ReactNode[];
  infinite?: boolean;
}

const SliderComp: React.FC<SliderComp> = ({ children, spaceBetween, slidesToShow, ...props }) =>
  (
    <Container>
      <SliderWrapper
        slidesToShow={slidesToShow || (children.length >= 3 ? 3 : children.length)}
        spaceBetween={spaceBetween || 40}
        nextArrow={<Arrow />}
        prevArrow={<Arrow left />}
        {...props}
      >
        {children}
      </SliderWrapper>
    </Container>
  );

export default SliderComp;
