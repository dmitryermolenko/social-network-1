import React from 'react';
import styled from 'styled-components';
import __ from 'lodash';

import PhotoItem from './PhotoItem';

const Headline = styled.h2`
  display: inline-block;
  padding: 20px 0;
`;

const SliderItem = (item) =>
  (
    <div key={__.uniqueId()}>
      <PhotoItem src={item.image} />
      <Headline>{item.headline}</Headline>
    </div>
  );

export default SliderItem;
