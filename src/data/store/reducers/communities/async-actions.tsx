import { Dispatch } from 'redux';
import * as actionsCommunities from './actions';
import { CommunitiesActions, TCommunities } from './types';
import { communities } from 'data/api'

export async function getCommunityData(
  dispatch: Dispatch<CommunitiesActions>,
  contracts: string[]
) {
  const res = await communities.getCommunityData(contracts)
  const { data: { data, errors } } = res
  console.log({ data })
  if (errors) { return }
  const { nftContracts } = data

  dispatch(actionsCommunities.setCommunities(nftContracts))
}
