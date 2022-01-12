import styled from 'styled-components';

export const Page = styled.div`
  height: 100%;
  background-color: ${props => props.theme.primaryColor};
`;


export const MainContent = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

export const Content = styled.main`
  padding: 24px 20px 0;
`
