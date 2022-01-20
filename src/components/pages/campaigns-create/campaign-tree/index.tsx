import { FC } from 'react'
import {
  WidgetTextarea,
  WidgetControls,
  WidgetButton,
  DoubleWidget,
  Title,
  Table,
  TableItem,
  TableWidget,
  TableItemImage,
  LinkAnchor
} from '../styled-compoents'
import { RootState } from 'data/store';
import communities from 'configs/communities'
import Icons from 'icons'
import {
  Widget
} from 'components/common'
import {
  parseDataERC20,
  parseDataERC1155,
  parseDataERC721,
  parseBalanceMapERC1155,
  parseBalanceMapERC721,
  parseBalanceMapERC20
} from 'helpers'
import * as communitiesAsyncActions from 'data/store/reducers/communities/async-actions'
import { TRetroDropStep, TRecipientsData, TRetroDropType } from 'types'
import * as newRetroDropActions from 'data/store/reducers/new-retro-drop/actions'
import { ContractActions } from 'data/store/reducers/contract/types'

import { Dispatch } from 'redux';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux'

interface INameToValueMap {
  [key: string]: any;
}

type TProps = {
  recipientsValue: string,
  setRecipientsValue: (value: string) => void,
  setRecipients: (value: TRecipientsData) => void,
  cancel: () => void
}

const mapStateToProps = ({
  communities: { communities },
  newRetroDrop: { type }
}: RootState) => ({
  loadedCommunities: communities,
  type
})
const mapDispatcherToProps = (dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions>) => {
  return {
    setStep: (step: TRetroDropStep) => dispatch(newRetroDropActions.setStep(step)),
    setMerkleTree: (merkleTree: any) => dispatch(newRetroDropActions.setMerkleTree(merkleTree)),
    getOwnersData: (contract: string) => communitiesAsyncActions.getOwnersData(dispatch, contract)
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const defineTreePlaceholder = (type: TRetroDropType | null) : string => {
  switch (type) {
    case 'erc1155':
      return `Be careful and paste info in the following order:

  Receiver address, token ID, amount
  Example:
  0x70dfbd1149250eddeae6ed2381993b517a1c9ce8, 1, 1
  0x203477162865dd22488a60e3e478e7795af95052, 2, 1
  0x2693ad693d042b9c04d2dce0a44a7608ea1f7d47, 1, 2

  and so on
`
    case 'erc721':
      return `Be careful and paste info in the following order:

  Receiver address, token ID
  Example:
  0x70dfbd1149250eddeae6ed2381993b517a1c9ce8, 1
  0x203477162865dd22488a60e3e478e7795af95052, 2
  0x2693ad693d042b9c04d2dce0a44a7608ea1f7d47, 1

  and so on
` 
    case 'erc20':
      return `Be careful and paste info in the following order:

  Receiver address, amount
  Example:
  0x70dfbd1149250eddeae6ed2381993b517a1c9ce8, 10
  0x203477162865dd22488a60e3e478e7795af95052, 20
  0x2693ad693d042b9c04d2dce0a44a7608ea1f7d47, 10

  and so on
` 
    default: return ''
  }
}

const CampaignTree: FC<ReduxType> = ({
  recipientsValue,
  setRecipientsValue,
  cancel,
  setMerkleTree,
  setStep,
  setRecipients,
  loadedCommunities,
  getOwnersData,
  type
}) => {

  const createTree = (type: TRetroDropType, recipientsValue: string): boolean => {
    let recipientsData
    let merkleData
    if (type === 'erc1155') {
      recipientsData = parseDataERC1155(type, recipientsValue)
      if (!recipientsData) {
        return false
      }
      merkleData = parseBalanceMapERC1155(recipientsData)
    }

    if (type === 'erc721') {
      recipientsData = parseDataERC721(type, recipientsValue)
      if (!recipientsData) {
        return false
      }
      merkleData = parseBalanceMapERC721(recipientsData)
    }

    if (type === 'erc20') {
      recipientsData = parseDataERC20(type, recipientsValue)
      if (!recipientsData) {
        return false
      }
      merkleData = parseBalanceMapERC20(recipientsData)
    }

    if (recipientsData && merkleData) {
      setRecipients(recipientsData)
      setMerkleTree(merkleData)
      return true
    }

    
    return false
  }


  return <DoubleWidget>
    <Widget>
      <WidgetTextarea
        title='Receiver address, token ID, amount'
        onChange={value => { setRecipientsValue(value); return value }}
        value={recipientsValue}
        placeholder={defineTreePlaceholder(type)}
      />
      <WidgetControls>
        <WidgetButton
          title='Start over'
          appearance='inverted'
          onClick={cancel}
        />
        <WidgetButton
          title='Parse data'
          disabled={!recipientsValue}
          onClick={() => {
            if (!type) return
            const validTree = createTree(type, recipientsValue)
            if (!validTree) {
              return alert('Error in tree format')
            }
            setStep('publish_ipfs')
          }}
        />
      </WidgetControls>
    </Widget>
    <TableWidget>
      <Title>Selected Communities</Title>
      <Table>
        {loadedCommunities.map((item: INameToValueMap) => {
          const image = communities[item.id]
          return <>
            <TableItem>
              <TableItemImage src={image.logo} alt={item.name} />
              {item.name}
            </TableItem>
            <TableItem onClick={_ => {
              getOwnersData(item.id)
            }}>
              Download CSV <Icons.DownloadIcon />
            </TableItem>
          </>
        })}
      </Table>
      <LinkAnchor to='/communities'>See the full list of communities <Icons.GoBackIcon /></LinkAnchor>
    </TableWidget>
  </DoubleWidget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignTree)

