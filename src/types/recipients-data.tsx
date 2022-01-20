export type TItemERC1155 = {
  [recipient: string]: {
    tokenId: string | number,
    amount: number
  }
}

export type TItemERC721 = {
  [recipient: string]: {
    tokenId: string | number
  }
}

export type TItemERC20 = {
  [recipient: string]: {
    amount: string | number
  }
}

type TRecipientsData = TItemERC1155 | TItemERC721 | TItemERC20

export default TRecipientsData