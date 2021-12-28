import React, { FC } from 'react'
import {
    Header,
    HeaderTitle,
    HeaderInfo,
    HeaderUseInfo,
		HeaderMenu,
		HeaderMenuItem,
		HeaderMenuItemActiveClass,
		HeaderLogoLink,
		ConnectionIndicator
		// @ts-ignore
} from './styled-components.tsx'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import Icons from 'icons'
import { shortenString, defineNetworkName, capitalize } from 'helpers'
import { RootState } from 'data/store';
import { connect } from 'react-redux';

const mapStateToProps = ({ user: { chainId, address } }: RootState) => ({ chainId, address })
type ReduxType = ReturnType<typeof mapStateToProps>

interface Props {}

const HeaderComponent: FC<Props & ReduxType> = ({ chainId, address }) => {
	return <ThemeProvider theme={themes.light}>
			<Header>
				<HeaderTitle>
					<HeaderLogoLink to='/'><Icons.LinkdropLogo />DropList</HeaderLogoLink>
				</HeaderTitle>
				<HeaderMenu>
					<HeaderMenuItem
						to='/'
						activeClassName={HeaderMenuItemActiveClass}
					>
						My campaigns
					</HeaderMenuItem>
				</HeaderMenu>
				<HeaderInfo>
					<HeaderUseInfo>
						{capitalize(defineNetworkName(chainId))}
					</HeaderUseInfo>
					<HeaderUseInfo>
						{address && <ConnectionIndicator />}
						{shortenString(address)}
					</HeaderUseInfo>
				</HeaderInfo>
			</Header>
	</ThemeProvider>
}


export default connect(mapStateToProps)(HeaderComponent)