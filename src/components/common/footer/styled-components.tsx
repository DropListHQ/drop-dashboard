import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Footer = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${props => props.theme.primaryTextColor};
`
export const FooterMenu = styled.div`
  display: flex;  
`
export const FooterMenuItem = styled(Link)`
  color: ${props => props.theme.primaryTextColor};
  margin-right: 30px;
  font-weight: 700;
  text-decoration: none;
  &:last-child {
    margin-right: 0px;
  }
`
export const FooterLogo = styled.div`
  font-size: 16px;
  font-weight: 700;
`