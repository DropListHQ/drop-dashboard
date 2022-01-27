import { Dispatch } from 'redux';
import * as actionsNewRetroDrop from './actions';
import { NewRetroDropActions } from './types';
import { TRetroDropType } from 'types'
import { pinataApi } from 'data/api'
type TIPFSResponse = { data: { IpfsHash: string, PinSize: number, Timestamp: string } }

export async function createIPFS(dispatch: Dispatch<NewRetroDropActions>, data: any, title: string, description: string, logoURL: string, tokenAddress: string, chainId: number, type: TRetroDropType) {
  dispatch(actionsNewRetroDrop.setLoading(true))
  const response: TIPFSResponse = await createIpfs(data, title, description, logoURL, tokenAddress, chainId, type)
  dispatch(actionsNewRetroDrop.setIPFS(response.data.IpfsHash))
  dispatch(actionsNewRetroDrop.setTitle(title))
  dispatch(actionsNewRetroDrop.setDescription(description))
  dispatch(actionsNewRetroDrop.setTitle(title))
  dispatch(actionsNewRetroDrop.setLoading(false))
  dispatch(actionsNewRetroDrop.setStep('deploy_contract'))
}

const createIpfs = async (data: any, title: string, description: string, logoURL: string, tokenAddress: string, chainId: number, type: TRetroDropType ) => {
  const merkleTree = {
    ...data,
    title,
    description,
    logoURL,
    tokenAddress,
    chainId,
    type
  }
  const response: TIPFSResponse = await pinataApi.post(merkleTree)
  return response
}