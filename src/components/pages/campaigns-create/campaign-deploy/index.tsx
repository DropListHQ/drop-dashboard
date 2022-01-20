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
import { defineNetworkName, capitalize } from 'helpers'
import { TMerkleTree, TRecipientsData } from 'types'

import * as newContractAsyncActions from 'data/store/reducers/contract/async-actions'
import { Dispatch } from 'redux';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux'
import { ContractActions } from 'data/store/reducers/contract/types'

type TProps = {
  dropTitle: string,
  recipients: TRecipientsData,
  cancel: () => void
}

const mapStateToProps = ({
  user: { address, provider, chainId },
  newRetroDrop: { loading, step, tokenAddress, ipfs, merkleTree },
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
  contractLoading
})
const mapDispatcherToProps = (dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions>) => {
  return {
    createDrop: (
      provider: any,
      merkleTree: TMerkleTree,
      tokenAddress: string,
      ipfsHash: string
    ) => newContractAsyncActions.createDrop(dispatch, provider, merkleTree, tokenAddress, ipfsHash)
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const CampaignDeploy: FC<ReduxType> = ({
  dropTitle,
  cancel,
  chainId,
  recipients,
  contractLoading,
  tokenAddress,
  ipfs,
  provider,
  merkleTree,
  createDrop
}) => {
  return <Widget>
    <DataBlock
      title='RetroDrop’s title'
      text={dropTitle}
    />
    <WidgetDataSplit>
      <WidgetDataBlock
        title='Network'
        text={capitalize(defineNetworkName(chainId))}
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
    <WidgetDataSplit>
      <WidgetDataBlock
        title='Total NFTs dropped'
        text={recipients ? Object.values(recipients).reduce((sum, item) => sum + Number(item.amount), 0) : 0}
      />
      <WidgetDataBlock
        title='Recipients'
        text={recipients ? Object.keys(recipients).length : 0}
      />
    </WidgetDataSplit>
    <WidgetControls>
      <WidgetButton
        title='Start over'
        appearance='inverted'
        onClick={cancel}
      />
      <WidgetButton
        title='Deploy'
        appearance={contractLoading ? 'gradient' : undefined}
        disabled={Boolean(!tokenAddress || !ipfs)}
        loading={contractLoading}
        onClick={() => {
          if (tokenAddress && ipfs) {
            createDrop(provider, merkleTree, tokenAddress, ipfs)
          }
        }}
      />
    </WidgetControls>
  </Widget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignDeploy)

