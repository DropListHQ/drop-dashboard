import {
  Footer,
  FooterMenu,
  FooterMenuItem,
  FooterLogo
  // @ts-ignore
} from './styled-components'

const FooterComponent = () => {
  return <Footer>
    <FooterLogo>DropList</FooterLogo>
    <FooterMenu>
      <FooterMenuItem target='_blank' to='https://twitter.com'>
        Twitter
      </FooterMenuItem>

      <FooterMenuItem target='_blank' to='https://discord.io'>
        Discord
      </FooterMenuItem>
    </FooterMenu>
  </Footer>
}

export default FooterComponent