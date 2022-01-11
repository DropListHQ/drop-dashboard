type TRecipientsData = {
  [recipient: string]: { amount: number | string, tokenId: string | number, maxSupply: number }
} | null

export default TRecipientsData