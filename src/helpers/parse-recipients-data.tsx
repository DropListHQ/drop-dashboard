import { checkRecipientsDataFormat } from './index'
import {
  TRetroDropType, 
} from 'types'

// initial data (as string)
// 0x70dFbD1149250EDDeAE6ED2381993B517A1c9cE8, 4, 1
// 0x203477162865Dd22488A60e3e478E7795af95052, 2, 1
// 0x306617C6c1013555470beFBdfb8A81e9e38fD1FA, 4, 2
// 0x3F389A7d841EdBa3964Ebd5acCbaf76f7525B3bE, 2, 2


// result
// {
//   "0xF3c6F5F265F503f53EAD8aae90FC257A5aa49AC1": { amount: 1, tokenId: 1, maxSupply: 1 },
//   "0xB9CcDD7Bedb7157798e10Ff06C7F10e0F37C6BdD": { amount: 2, tokenId: 2, maxSupply: 2 },
// }

const parseData = (type: TRetroDropType, data: string): {
  [recipient: string]: {
    tokenId: string | number,
    amount: number,
    maxSupply: number
  }
} | null => {

  if (!data) {
    return null
  }
  const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  if (!recipientsFormatValid) {
    return null
  }
  const recipients = data.split('\n')

  const recipientsData = recipients.reduce<{
    result: {
      [recipient: string]: {
        tokenId: string | number,
        amount: number,
        maxSupply: number
      }
    },
  }>((memo, item: string) => {
    const itemSplit = item.split(',').map((item: string) => item.trim())
    return {
      result: {
        ...memo.result,
        [itemSplit[0]]: {
          tokenId: itemSplit[1],
          amount: Number(itemSplit[2]),
          maxSupply: Number(itemSplit[3])
        }
      }
    }
  }, {
    result: {},
  })

  return recipientsData.result
}

export default parseData




