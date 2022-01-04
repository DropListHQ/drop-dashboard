import { Dispatch } from 'redux';
import * as actionsCommunities from './actions';
import { CommunitiesActions, TCommunities } from './types';
import { communities } from 'api'

export async function getCommunityData(
  dispatch: Dispatch<CommunitiesActions>,
  contractAddress: string,
  currentCommunities: TCommunities
) {
  const { data: { data: { nftContracts } } } = await communities.getCommunityData(contractAddress)
  const communitiesUpdated = currentCommunities.map(item => {
    if (item.id === contractAddress) {
      item = nftContracts[0]
    }
    return item
  })
  dispatch(actionsCommunities.setCommunities(communitiesUpdated))
}
