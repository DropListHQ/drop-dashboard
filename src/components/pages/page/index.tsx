import React, { FC } from 'react'
// import { functionalActions } from 'decorators'
import { Header, Aside } from 'components/common'
import { Page, MainContent, Content } from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import { useLocation } from 'react-router-dom'
import { Scrollbar } from "react-scrollbars-custom";

interface PageProps {
  account?: string,
  chainId?: number
}

const PageComponent: FC<PageProps> = ({ children, account, chainId }) => {
  const { pathname } = useLocation()
  
  return (
    <ThemeProvider theme={themes.light}>
      <Page>
        <Aside />
        <MainContent>
          <Header
            title={defineTitle(pathname)}
          />
          <Content>
            <Scrollbar style={{ width: '100%', height: 'calc(100vh - 68px - 48px)' }}>
              {children}
            </Scrollbar>
          </Content>
        </MainContent>
      </Page>
    </ThemeProvider>
  );
};

const defineTitle = (url: string) => {
  switch (url) {
    case '/':
      return 'Dashboard'
    default:
      return 'Dashboard'
  }
}

export default PageComponent;
