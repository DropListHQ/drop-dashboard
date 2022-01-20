import { FC } from 'react'
import {
  WidgetControls,
  WidgetButton,
  WidgetDataSplit,
  WidgetDataBlock
} from '../styled-compoents'
import { RootState } from 'data/store';
import {
  Widget,
  DataBlock
} from 'components/common'
import { useHistory } from 'react-router-dom'
import { TRetroDropType, TRecipientsData } from 'types'

import * as newContractAsyncActions from 'data/store/reducers/contract/async-actions'
import { Dispatch } from 'redux';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux'
import { ContractActions } from 'data/store/reducers/contract/types'

type TProps = {
  recipients: TRecipientsData,
  cancel: () => void,
  dropTitle: string,
  dropLogoURL: string,
  dropDescription: string,
}

const mapStateToProps = ({
  user: { address, provider, chainId },
  newRetroDrop: { loading, step, tokenAddress, ipfs, merkleTree, dropAddress, type },
  contract: { loading: contractLoading },
}: RootState) => ({
  loading,
  address,
  provider,
  ipfs,
  step,
  tokenAddress,
  merkleTree,
  chainId,
  contractLoading,
  dropAddress,
  type
})
const mapDispatcherToProps = (dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions>) => {
  return {
    approve: (
      provider: any,
      tokenAddress: string,
      userAddress: string,
      dropAddress: string,
      ipfsHash: string,
      title: string,
      address: string,
      chainId: number,
      description: string,
      dropLogoURL: string,
      recipientsData: TRecipientsData,
      type: TRetroDropType,
      callback: () => void
    ) => newContractAsyncActions.approve(
      dispatch,
      provider,
      tokenAddress,
      userAddress,
      dropAddress,
      ipfsHash,
      title,
      address,
      chainId,
      description,
      dropLogoURL,
      recipientsData,
      type,
      callback
    ),
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const CampaignApproval: FC<ReduxType> = ({
  dropTitle,
  cancel,
  chainId,
  recipients,
  contractLoading,
  tokenAddress,
  ipfs,
  provider,
  dropAddress,
  type,
  address,
  dropLogoURL,
  dropDescription,
  approve
}) => {
  const history = useHistory()
  return <Widget>
    <DataBlock
      title='RetroDrop’s title'
      text={dropTitle}
    />
    <WidgetDataSplit>
      <WidgetDataBlock
        title='Network'
        text='Ethereum Mainnet'
      />
      <WidgetDataBlock
        title='Type of token'
        text='ERC1155'
      />
    </WidgetDataSplit>
    <DataBlock
      title='Token Address'
      text={tokenAddress || ''}
    />
    <DataBlock
      title='Your retrodrop contract'
      text={dropAddress || ''}
    />
    <WidgetDataSplit>
      <WidgetDataBlock
        title='Total NFTs dropped'
        text={recipients ? Object.values(recipients).reduce((sum, item) => sum + Number(item.amount), 0) : 0}
      />
      <WidgetDataBlock
        title='Recipients'
        text={Object.keys(recipients || {}).length}
      />
    </WidgetDataSplit>
    <WidgetControls>
      <WidgetButton
        title='Start over'
        appearance='inverted'
        onClick={cancel}
      />
      <WidgetButton
        title='Give approval'
        disabled={!tokenAddress || !dropAddress}
        loading={contractLoading}
        appearance={contractLoading ? 'gradient' : undefined}
        onClick={() => {
          if (!tokenAddress || !dropAddress || !ipfs || !chainId || !type) { return }
          approve(
            provider,
            tokenAddress,
            address,
            dropAddress,
            ipfs,
            dropTitle,
            address,
            chainId,
            dropDescription,
            dropLogoURL,
            recipients,
            type,
            () => {
              history.push('/')
            }
          )
        }}
      />
    </WidgetControls>
  </Widget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignApproval)
