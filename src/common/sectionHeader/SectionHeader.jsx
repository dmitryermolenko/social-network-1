import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Headline = styled.h2`
  
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  vertical-align: middle;
  color: #000;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 67px;
  margin: 65px 0;
`;

const SectionHeader = ({ headline, children }) =>
  (
    <Container>
      <Headline>{headline}</Headline>
      {children || null}
    </Container>
  );

export default SectionHeader;

SectionHeader.defaultProps = {
  headline: '',
  children: [],
};

SectionHeader.propTypes = {
  headline: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array,
};
