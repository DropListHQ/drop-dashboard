import { Dispatch } from 'redux';
import * as actions from './actions';
import { UserActions } from './types';
import Web3Modal from "web3modal";
import { Web3Provider } from '@ethersproject/providers'

function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), timeout))
}
export async function addItemAsync(dispatch: Dispatch<UserActions>, item: string) {
  dispatch(actions.setLoading(true));
  await sleep(1000);
  dispatch(actions.setAddress(item));
  dispatch(actions.setLoading(false));
}

export async function connectWallet (dispatch: Dispatch<UserActions>) {
  const providerOptions = {
  /* See Provider Options Section */
  };
  const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
  })
  const provider = await web3Modal.connect();
  const providerWeb3 = new Web3Provider(provider)
  
  const { chainId } = await providerWeb3.getNetwork()
  const accounts = await providerWeb3.listAccounts()
  dispatch(actions.setProvider(providerWeb3))
  dispatch(actions.setAddress(accounts[0]))
  dispatch(actions.setChainId(chainId))
}