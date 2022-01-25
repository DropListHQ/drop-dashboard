import { BigNumber, utils } from 'ethers'
import BalanceTree from './balance-tree'

import { TItemERC1155, MerkleDistributorInfoERC1155 } from 'types'

const { isAddress, getAddress } = utils

// This is the blob that gets distributed and pinned to IPFS.
// It is completely sufficient for recreating the entire merkle tree.
// Anyone can verify that all air drops are included in the tree,
// and the tree has no additional distributions.


type NewFormat = {
  address: string;
  earnings: string;
  reasons: string;
  tokenId: number | string
}

export default function parseBalanceMapERC1155(balances: TItemERC1155 | NewFormat[]): MerkleDistributorInfoERC1155 {
  // if balances are in an old format, process them
  const balancesInNewFormat: NewFormat[] = Array.isArray(balances)
    ? balances
    : Object.keys(balances).map(
        (account): NewFormat => ({
          address: account,
          earnings: `0x${balances[account].amount.toString(16)}`,
          reasons: '',
          tokenId: balances[account].tokenId
        })
      )

  const dataByAddress = balancesInNewFormat.reduce<{
    [address: string]: {
      amount: BigNumber;
      tokenId: number | string,
      flags?: {
        [flag: string]: boolean
      }
    }
  }>((memo, {
    address: account,
    earnings,
    reasons,
    tokenId
  }) => {
    if (!isAddress(account)) {
      throw new Error(`Found invalid address: ${account}`)
    }
    const parsed = getAddress(account)
    if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`)
    const parsedNum = BigNumber.from(earnings)
    if (parsedNum.lte(0)) throw new Error(`Invalid amount for account: ${account}`)

    const flags = {
      isSOCKS: reasons.includes('socks'),
      isLP: reasons.includes('lp'),
      isUser: reasons.includes('user'),
    }

    memo[parsed] = {
      amount: parsedNum,
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
        amount: dataByAddress[address].amount,
        tokenId: dataByAddress[address].tokenId
      }
    })
  )
  // generate claims
  const claims = sortedAddresses.reduce<{
    [address: string]: {
      amount: string;
      index: number;
      proof: string[];
      tokenId: number | string,
      flags?: {
        [flag: string]: boolean
      }
    }
  }>((memo, address, index) => {
    const { amount, flags, tokenId } = dataByAddress[address]
    memo[address] = {
      index,
      amount: amount.toHexString(),
      tokenId,
      proof: tree.getProof(
        index,
        address,
        amount,
        tokenId
      ),
      ...(flags ? { flags } : {}),
    }
    return memo
  }, {})

  const tokenTotal: BigNumber = sortedAddresses.reduce<BigNumber>(
    (memo, key) => memo.add(dataByAddress[key].amount),
    BigNumber.from(0)
  )

  return {
    merkleRoot: tree.getHexRoot(),
    tokenTotal: tokenTotal.toHexString(),
    claims,
    creationTime: +(new Date())
  }
}