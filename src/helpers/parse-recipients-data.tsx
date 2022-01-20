import { checkRecipientsDataFormat } from './index'
import {
  TRetroDropType,
  TItemERC1155,
  TItemERC721,
  TItemERC20
} from 'types'

type TResult<TItemType> = (type: TRetroDropType, data: string) => TItemType | null


export const parseDataERC1155: TResult<TItemERC1155> = (type, data) => {
  if (!data || !type) {
    return null
  }
  const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  if (!recipientsFormatValid) {
    return null
  }
  const recipients = data.split('\n')

  const recipientsData = recipients.reduce<TItemERC1155>((memo, item: string) => {
    const itemSplit = item.split(',').map((item: string) => item.trim())
    return {
      ...memo,
      [itemSplit[0]]: {
        tokenId: itemSplit[1],
        amount: Number(itemSplit[2])
      }
    }
  }, {})

  return recipientsData
}


export const parseDataERC721: TResult<TItemERC721> = (type, data) => {
  if (!data || !type) {
    return null
  }
  const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  if (!recipientsFormatValid) {
    return null
  }
  const recipients = data.split('\n')

  const recipientsData = recipients.reduce<TItemERC721>((memo, item: string) => {
    const itemSplit = item.split(',').map((item: string) => item.trim())
    return {
      ...memo,
      [itemSplit[0]]: {
        tokenId: itemSplit[1],
      }
    }
  }, {})

  return recipientsData
}

export const parseDataERC20: TResult<TItemERC20> = (type, data) => {
  if (!data || !type) {
    return null
  }
  const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  if (!recipientsFormatValid) {
    return null
  }
  const recipients = data.split('\n')

  const recipientsData = recipients.reduce<TItemERC20>((memo, item: string) => {
    const itemSplit = item.split(',').map((item: string) => item.trim())
    return {
      ...memo,
      [itemSplit[0]]: {
        amount: itemSplit[1],
      }
    }
  }, {})

  return recipientsData
}




