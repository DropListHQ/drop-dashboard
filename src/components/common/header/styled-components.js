import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: space-between;
  width: 100%;
  height: 68px;
  padding: 0 35px 0 20px;
`;

export const HeaderTitle = styled.h2`
  color: ${props => props.theme.primaryTextColor};
  flex: 1;
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
export const HeaderNetwork = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
`
export const HeaderAccount = styled.span`
  display: inline-block;
  margin-left: 8px;
  color: ${props => props.theme.primaryHighlightColor};
  font-weight: 700;
  margin-right: 16px;

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