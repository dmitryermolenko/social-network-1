/*
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import __ from 'lodash';

import Carousel, { consts } from 'react-elastic-carousel';
import arrowIcon from '../img/icons/arr_left.svg';

const Arrow = styled.div`
  position: absolute;
  width: 15px;
  height: 25px;
  background-color: #515151;
  mask-image: url(${arrowIcon});
  transform: ${(props) =>
    (props.reverseArrow ? '' : 'rotate(180deg)')};
  top: calc(33% - 10px);
  left: ${(props) =>
    (props.reverseArrow ? '20px' : 'auto')};
  right: ${(props) =>
    (props.reverseArrow ? 'auto' : '20px')};
  z-index: 11;
  &:hover {
    cursor: pointer;
  }
`;

const myArrow = ({ type, onClick, isEdge }) => {
  const reverseArrow = type === consts.PREV;
  return <Arrow reverseArrow={reverseArrow} onClick={onClick} disabled={isEdge} />;
};

const Slider = ({ children, ...props }) =>
  (
    <Carousel {...props} renderArrow={myArrow}>
      {children.map((slide) =>
        (
          <div key={__.uniqueId()}>{slide}</div>
        ))}
    </Carousel>
  );

export default Slider;

Slider.defaultProps = {};

Slider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array.isRequired,
};
*/
