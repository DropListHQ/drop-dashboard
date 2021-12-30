import React, { useEffect, useState, FC } from 'react'
import { Route, Switch, HashRouter, Redirect, useLocation } from 'react-router-dom'
// import { functionalActions } from 'decorators'
import ProtectedRoute from './protected-route'

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
import * as asyncActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import { connect } from 'react-redux';
import { RootState } from 'data/store';

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    connectWallet: () => asyncActions.connectWallet(dispatch)
  }
}
const mapStateToProps = ({ user: { provider, address } }: RootState) => ({ provider, address })
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const AppRouter: FC<ReduxType> = ({ address, connectWallet }) => {
  return <HashRouter>
    <Page>
      <Switch>

        <ProtectedRoute
          path='/campaigns/new'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreate}
        />
        <Route path='/' exact={true} render={props => <Campaigns
          connectWallet={connectWallet}
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