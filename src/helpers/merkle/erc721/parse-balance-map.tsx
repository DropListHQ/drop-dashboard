import { utils } from 'ethers'
import BalanceTree from './balance-tree'

import { TItemERC721, MerkleDistributorInfoERC721 } from 'types'

const { isAddress, getAddress } = utils

type NewFormat = {
  address: string;
  reasons: string;
  tokenId: number | string
}

export default function parseBalanceMapERC1155(balances: TItemERC721 | NewFormat[]): MerkleDistributorInfoERC721 {
  // if balances are in an old format, process them
  const balancesInNewFormat: NewFormat[] = Array.isArray(balances)
    ? balances
    : Object.keys(balances).map(
        (account): NewFormat => ({
          address: account,
          reasons: '',
          tokenId: balances[account].tokenId
        })
      )

  const dataByAddress = balancesInNewFormat.reduce<{
    [address: string]: {
      tokenId: number | string,
      flags?: {
        [flag: string]: boolean
      }
    }
  }>((memo, {
    address: account,
    reasons,
    tokenId
  }) => {
    if (!isAddress(account)) {
      throw new Error(`Found invalid address: ${account}`)
    }
    const parsed = getAddress(account)
    if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`)

    const flags = {
      isSOCKS: reasons.includes('socks'),
      isLP: reasons.includes('lp'),
      isUser: reasons.includes('user'),
    }

    memo[parsed] = {
      tokenId,
      ...(reasons === '' ? {} : { flags })
    }
    return memo
  }, {})

  const sortedAddresses = Object.keys(dataByAddress).sort()

  // construct a tree
  const tree = new BalanceTree(
    sortedAddresses.map((address) => {
      return {
        account: address,
        tokenId: dataByAddress[address].tokenId
      }
    })
  )
  // generate claims
  const claims = sortedAddresses.reduce<{
    [address: string]: {
      index: number;
      proof: string[];
      tokenId: number | string,
      flags?: {
        [flag: string]: boolean
      }
    }
  }>((memo, address, index) => {
    const { flags, tokenId } = dataByAddress[address]
    memo[address] = {
      index,
      tokenId,
      proof: tree.getProof(
        index,
        address,
        tokenId
      ),
      ...(flags ? { flags } : {}),
    }
    return memo
  }, {})

  return {
    merkleRoot: tree.getHexRoot(),
    claims,
    creationTime: +(new Date())
  }
}