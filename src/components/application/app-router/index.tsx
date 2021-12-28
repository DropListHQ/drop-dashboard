import React, { useEffect, useState, FC } from 'react'
import { Route, Switch, HashRouter, Redirect, useLocation } from 'react-router-dom'
// import { functionalActions } from 'decorators'
import { history } from 'data/store'
import Web3Modal from "web3modal";
import { Web3Provider } from '@ethersproject/providers'

import {
  NotFound,
  Page,
  Campaigns,
  CampaignsCreate
//   NotFound,
//   ProtectedRoute,
//   Authorize
} from 'components/pages'
import { Dispatch } from 'redux';
import * as actions from 'data/store/reducers/user/actions'
import { UserActions } from 'data/store/reducers/user/types'
import { connect } from 'react-redux';
import { RootState } from 'data/store';

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
      setAddress: (address: string) => dispatch(actions.setAddress(address)),
      setProvider: (provider: any) => dispatch(actions.setProvider(provider)),
      setChainId: (chainId: number) => dispatch(actions.setChainId(chainId))
  }
}
const mapStateToProps = ({ user: { provider } }: RootState) => ({ provider })

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const AppRouter: FC<ReduxType> = ({ setAddress, setProvider, setChainId, provider }) => {
  useEffect(() => {
    async function defineProvider () {
      const providerOptions = {
        /* See Provider Options Section */
      };
      const web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: true, // optional
        providerOptions // required
      })
      const provider = await web3Modal.connect();
      const providerWeb3 = new Web3Provider(provider)
      
      const { chainId } = await providerWeb3.getNetwork()
      const accounts = await providerWeb3.listAccounts()
      setProvider(providerWeb3)
      setAddress(accounts[0])
      setChainId(chainId)
    }
    
    if (provider) { return }
    defineProvider()
  }, [])

  

  if (!provider) {
    return <>Loading</>
  }

  return <HashRouter>
    <Page>
      <Switch>
        <Route path='/campaigns/new' exact={true} render={props => <CampaignsCreate
          {...props}
        />} />
        <Route path='/' exact={true} render={props => <Campaigns
          {...props}
        />} />
        <Route path='*' exact={true} render={props => <NotFound
          {...props}
        />} />
      </Switch>
    </Page>
  </HashRouter>
}

export default connect(mapStateToProps, mapDispatcherToProps)(AppRouter)