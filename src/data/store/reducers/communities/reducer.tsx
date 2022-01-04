import { CommunitiesState, CommunitiesActions } from './types';
import { Constants } from './constants';

const initialState: CommunitiesState = {
  loading: false,
  communities: [
    {
      id: '0x4ab6d8ff68330d844a3056ea2f8179a7e19759ff',
      name: null,
      numOwners: null,
      numTokens: null
    }
  ]
};

export function communitiesReducer(
  state: CommunitiesState = initialState,
  action: CommunitiesActions
): CommunitiesState {
    switch (action.type) {
        case Constants.COMMUNITIES_SET_LOADING:
          return {...state, loading: action.payload.loading }
        case Constants.COMMUNITIES_SET_COMMUNITIES:
          return {...state, communities: action.payload.communities }
        default:
            return state;
    }
}