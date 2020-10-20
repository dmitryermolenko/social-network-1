import React from 'react';

import { Link } from 'react-router-dom';
import logo from './img/H1 JMSN.svg';
import exit from './img/exit.svg';
import customization from './img/customization.svg';
import ru from './img/RU.svg';
import search from './img/search.svg';
import {
  HeaderContainer,
  Logo,
  RightBlockHeader,
  IconHeader,
  InputHeader,
  ButtonSearch,
  IconSearch,
} from '../styledComponents';

const Header = () =>
  (
    <HeaderContainer>
      <Link to="/">
        <Logo img={logo} />
      </Link>
      <RightBlockHeader>
        <ButtonSearch>
          <IconSearch img={search} />
        </ButtonSearch>
        <form>
          <InputHeader type="text" />
        </form>
        <IconHeader img={ru} />
        <IconHeader img={customization} />
        <Link to="/social-network">
          <IconHeader img={exit} />
        </Link>
      </RightBlockHeader>
    </HeaderContainer>
  );

export default Header;
