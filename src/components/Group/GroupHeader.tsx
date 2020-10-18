import React from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import { GroupHeaderData } from '../../types/group';

const GroupHeader: React.FC<GroupHeaderData> = ({
  data: {
    description,
    linkSite,
    ownerFio,
    persistDate,
  },
}) => {
  const originDate = format(new Date(persistDate), "dd.MM.yyyy' в 'HH:mm");
  return (
    <NavbarWrapper>
      <OriginDate>{originDate}</OriginDate>
      <GroupDescription>{description}</GroupDescription>
      <Link href={linkSite}>{linkSite}</Link>
      <Owner>{ownerFio}</Owner>
    </NavbarWrapper>
  );
};
export default GroupHeader;

const NavbarWrapper = styled.nav`
  font-style: normal;
  font-weight: normal;
  min-height: 150px;
  border-bottom: 1px solid #515151;
  color: #515151;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`;

const OriginDate = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 165%;
  color: #000000;
  margin-bottom: 15px;
`;

const GroupDescription = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 165%;
  color: #000000;
  margin-bottom: 15px;
  text-align: left;
`;

const Link = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 165%;
  text-decoration-line: underline;
  color: #000000;
  margin-bottom: 15px;
`;

const Owner = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 165%;
  color: #000000;
  margin-bottom: 15px;
`;
