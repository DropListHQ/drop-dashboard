import React, { FC } from 'react'
// import { functionalActions } from 'decorators'
import { Header, Footer } from 'components/common'
import { Page, MainContent, Content } from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import { Scrollbar } from "react-scrollbars-custom";

interface PageProps {
  account?: string,
  chainId?: number
}

const PageComponent: FC<PageProps> = ({ children, account, chainId }) => {
  
  return (
    <ThemeProvider theme={themes.light}>
      <Page>
        <MainContent>
          <Header />
          <Content>
            <Scrollbar style={{ width: '100%', height: 'calc(100vh - 68px - 48px - 40px)' }}>
              {children}
            </Scrollbar>
          </Content>
          <Footer />
        </MainContent>
      </Page>
    </ThemeProvider>
  );
};

export default PageComponent;
