import React, { FC } from 'react'
import {
    Header,
    HeaderTitle,
    HeaderInfo,
    HeaderMode,
    HeaderNetwork,
    HeaderAccount,
    HeaderNetworkIcon
} from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import Icons from 'icons'
import { shortenString, defineNetworkName, capitalize } from 'helpers'
import { RootState } from 'data/store';
import { connect } from 'react-redux';

const mapStateToProps = ({ user: { chainId, address } }: RootState) => ({ chainId, address })
type ReduxType = ReturnType<typeof mapStateToProps>

interface Props {
  title: string,
}

const HeaderComponent: FC<Props & ReduxType> = ({ title, chainId, address }) => {
	console.log({ address })
	return <ThemeProvider theme={themes.light}>
			<Header>
					<HeaderTitle>{title}</HeaderTitle>
					<HeaderInfo>
							<HeaderMode>Light Mode</HeaderMode>
							<HeaderNetwork>
									{capitalize(defineNetworkName(chainId))} <HeaderAccount>{shortenString(address)}</HeaderAccount>
									<HeaderNetworkIcon>
											<Icons.EthereumLogo />
									</HeaderNetworkIcon>
							</HeaderNetwork>
					</HeaderInfo>
			</Header>
	</ThemeProvider>
}


export default connect(mapStateToProps)(HeaderComponent)