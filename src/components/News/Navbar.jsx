/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';
import img from '../../img/icons/search.svg';

const Navbar = () =>
  (
    <NavbarWrapper>
      <NavbarContainer>
        <Menu>
          <ButtonActive>Все</ButtonActive>
          <Button>Новости</Button>
          <Button>Интересные</Button>
          <Button>Теги</Button>
        </Menu>
        <ButtonSearch>
          <SearchIcon src={img} alt="Поиск" />
        </ButtonSearch>
      </NavbarContainer>
    </NavbarWrapper>
  );

export default Navbar;

const NavbarWrapper = styled.nav`
  
  font-style: normal;
  font-weight: normal;
  min-height: 150px;
  border-bottom: 1px solid #515151;
  color: #515151;
  display: flex;
`;

const NavbarContainer = styled.div`
  width: 100%;
  padding-top: 70px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  
  font-size: 16px;
  line-height: 20px;
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  margin-right: 50px;
  padding: 0;
  padding-bottom: 7px;
  transition: 0.1s;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

const ButtonActive = styled(Button)`
  border-bottom: 3px solid #ffb11b;
`;

const Menu = styled.div`
  z-index: 1;
`;

const ButtonSearch = styled.button`
  width: 35px;
  height: 35px;
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  padding: 0;
  transition: 0.1s;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.img`
  z-index: 1;
`;
