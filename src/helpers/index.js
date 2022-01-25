import shortenString from './shorten-string'
import defineNetworkName from './define-network-name'
import capitalize from './capitalize'
import {
  parseDataERC20,
  parseDataERC1155,
  parseDataERC721
} from './parse-recipients-data'
import { parseBalanceMapERC1155, parseBalanceMapERC721, parseBalanceMapERC20 } from './merkle'
import defineJSONRpcUrl from './define-json-rpc-url'
import copyToClipboard from './copy-to-clipboard'
import getCSV from './get-csv'
import checkRecipientsDataFormat from './check-recipients-data-format'
import hexlifyIpfsHash from './hexlify-ipfs-hash'

export {
  shortenString,
  defineNetworkName,
  capitalize,
  parseDataERC20,
  parseDataERC1155,
  parseDataERC721,
  parseBalanceMapERC1155,
  defineJSONRpcUrl,
  getCSV,
  copyToClipboard,
  checkRecipientsDataFormat,
  parseBalanceMapERC721,
  parseBalanceMapERC20,
  hexlifyIpfsHash
}