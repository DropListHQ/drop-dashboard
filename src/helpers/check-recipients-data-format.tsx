import {
  TRetroDropType, 
} from 'types'

const checkRecipientsDataFormat = (type: TRetroDropType, data: string): boolean => {
  const recipients = data.split('\n')
  if (type === 'erc1155') {
    const isValid = recipients.every(item => {
      const itemDivided = item.split(',').map((item: string) => item.trim())
      const lengthIsValid = itemDivided[0].length === 42 && itemDivided.length === 4
      const maxSupply = itemDivided[3]
      const tokenId = itemDivided[1]
      const maxSupplyIsValid = recipients.every(item => {
        const itemDivided = item.split(',').map((item: string) => item.trim())
        if (tokenId !== itemDivided[1]) { return true }
        return maxSupply === itemDivided[3]
      })

      return maxSupplyIsValid && lengthIsValid
    })

    return isValid
  }
  if (type === 'erc721') {
    const isValid = recipients.every(item => {
      const itemDivided = item.split(',').map((item: string) => item.trim())
      return itemDivided[0].length === 42 && itemDivided.length === 3
    })

    return isValid
  }
  return true
}

export default checkRecipientsDataFormat

// 0x70dFbD1149250EDDeAE6ED2381993B517A1c9cE8, 4, 1, 3
// 0x203477162865Dd22488A60e3e478E7795af95052, 2, 1, 9
// 0x306617C6c1013555470beFBdfb8A81e9e38fD1FA, 4, 2, 3
// 0x3F389A7d841EdBa3964Ebd5acCbaf76f7525B3bE, 2, 8, 9