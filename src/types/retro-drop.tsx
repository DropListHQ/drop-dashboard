import { TRetroDropStatus } from './index.js'

type TRetroDrop = {
  title: string,
  ipfsHash: string,
  address: string,
  chainId: number,
  description: string,
  logoURL: string,
  status: TRetroDropStatus,
  tokenAddress: string
}

export default TRetroDrop