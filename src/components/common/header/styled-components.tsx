import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom'

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: space-between;
  width: 100%;
  height: 68px;
  padding: 0 20px;
`;

export const HeaderTitle = styled.h2`
  color: ${props => props.theme.primaryTextColor};
  font-size: 16px;
  flex: 1;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
  }
`

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderMode = styled.div`
  margin-right: 16px;
  padding-right: 16px;
  border-right: 1px solid ${props => props.theme.primaryBorderColor};
  line-height: 20px;
  font-size: 14px;
`

export const HeaderLogoLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${props => props.theme.primaryTextColor};
`
export const ConnectionIndicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: ${props => props.theme.tagSuccessColor};
  margin-right: 8px;
`

export const HeaderUseInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  min-width: 152px;
  border-radius: 20px;
  font-weight: 700;
  min-height: 36px;
  text-align: center;
  justify-content: center;
  margin-right: 16px;
  border: 1px solid ${props => props.theme.primaryBorderColor};

  ${props => props.onClick && css`
    cursor: pointer;
  `}
`
export const HeaderMenu = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
`
export const HeaderMenuItemActiveClass = 'headerMenuItemActiveClass'

export const HeaderMenuItem = styled(NavLink)`
  color: ${props => props.theme.primaryTextColor};
  text-decoration: none;
  padding: 20px 32px;
  line-height: 1;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: background-color .3s;

  &.${HeaderMenuItemActiveClass} {
    text-decoration: underline;
  }
`

export const HeaderNetworkIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 100%;
  background: #FFF;
  
`
export const HeaderNetworkIconImg = styled.img`

`