import { createBrowserHistory } from 'history'
import { combineReducers, createStore } from 'redux';

import { userReducer } from './reducers/user/reducer';
import { contractReducer } from './reducers/contract/reducer'
import { newRetroDropReducer } from './reducers/new-retro-drop/reducer'
import { dropsReducer } from './reducers/drops/reducer'

import { setProps, getLocalStore, setLocalStore } from './local-storage-redux'
import { UserState } from './reducers/user/types';
import { ContractState } from './reducers/contract/types';
import { NewRetroDropState } from './reducers/new-retro-drop/types';
import { DropsState } from './reducers/drops/types';

export const history = createBrowserHistory()
setProps(['drops'])

export interface RootState {
    user: UserState,
    contract: ContractState,
    newRetroDrop: NewRetroDropState,
    drops: DropsState
}

const store = createStore<RootState, any, any, any>(
  combineReducers({
    user: userReducer,
    contract: contractReducer,
    newRetroDrop: newRetroDropReducer,
    drops: dropsReducer
  }),
  getLocalStore()
)

function init () {
  setLocalStore(store)
}
store.subscribe(init)
init()

export default store;