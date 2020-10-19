import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GridContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-gap: ${(props) =>
    `${props.gap}`};
`;

const AllPhotosGrid = ({ children, ...props }) => {
  const { template, gap } = props;
  return (
    <GridContainer template={template} gap={gap}>
      {children}
    </GridContainer>
  );
};

export default AllPhotosGrid;

AllPhotosGrid.defaultProps = {
  template: '',
  gap: '',
};

AllPhotosGrid.propTypes = {
  template: PropTypes.string,
  gap: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array.isRequired,
};
