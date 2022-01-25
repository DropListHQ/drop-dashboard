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
      <FooterMenuItem target='_blank' to='https://twitter.com/DropList_eth'>
        Twitter
      </FooterMenuItem>

      <FooterMenuItem target='_blank' to='https://discord.com/invite/UCYhTkQSyg'>
        Discord
      </FooterMenuItem>
    </FooterMenu>
  </Footer>
}

export default FooterComponent