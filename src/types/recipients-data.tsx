type TRecipientsData = {
  [recipient: string]: { amount: number | string, tokenId: string | number }
} | null

export default TRecipientsData