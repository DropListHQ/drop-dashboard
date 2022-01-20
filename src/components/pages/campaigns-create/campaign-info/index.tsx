import { FC } from 'react'
import {
  WidgetInput,
  WidgetTextarea,
  WidgetControls,
  WidgetButton,
  DoubleWidget,
} from '../styled-compoents'
import { RootState } from 'data/store';
import {
  Widget,
  PreviewWidget
} from 'components/common'
import * as newRetroDropAsyncActions from 'data/store/reducers/new-retro-drop/async-actions'
import { Dispatch } from 'redux';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux'

type TProps = {
  dropTitle: string,
  dropLogoURL: string,
  dropDescription: string,
  setDropTitle: (value: string) => void,
  setDropLogoURL: (value: string) => void,
  setDropDescription: (value: string) => void,
  cancel: () => void
}

const mapStateToProps = ({
  user: { address, provider, chainId },
  newRetroDrop: { loading, step, tokenAddress, ipfs, merkleTree },
}: RootState) => ({
  loading,
  address,
  provider,
  ipfs,
  step,
  tokenAddress,
  merkleTree,
  chainId
})
const mapDispatcherToProps = (dispatch: Dispatch<NewRetroDropActions>) => {
  return {
    createIPFS: (data: any, title: string, description: string, logoURL: string, tokenAddress: string, chainId: number) => newRetroDropAsyncActions.createIPFS(dispatch, data, title, description, logoURL, tokenAddress, chainId),
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const CampaignInfo: FC<ReduxType> = ({
  dropTitle,
  dropLogoURL,
  dropDescription,
  loading,
  setDropTitle,
  setDropLogoURL,
  setDropDescription,
  cancel,
  createIPFS,
  tokenAddress,
  merkleTree,
  chainId
}) => {
  return <DoubleWidget>
    <Widget>
      <WidgetInput
        title='Enter title here'
        onChange={value => { setDropTitle(value); return value}}
        value={dropTitle}
      />
      <WidgetInput
        title='Logo URL'
        onChange={value => { setDropLogoURL(value); return value}}
        value={dropLogoURL}
        placeholder='https://'
      />
      <WidgetTextarea
        title='Description'
        onChange={value => { setDropDescription(value); return value}}
        value={dropDescription}
        limit={120}
        placeholder='Enter description here'
      />
      <WidgetControls>
        <WidgetButton
          title='Start over'
          appearance='inverted'
          onClick={cancel}
        />
        <WidgetButton
          title='Publish'
          loading={loading}
          appearance={loading ? 'gradient' : undefined}
          disabled={!dropTitle || !tokenAddress}
          onClick={() => {
            if (!tokenAddress || !chainId) { return }
            createIPFS(merkleTree, dropTitle, dropDescription, dropLogoURL, tokenAddress, chainId)
          }}
        />
      </WidgetControls>
    </Widget>
    <PreviewWidget
      title={dropTitle}
      description={dropDescription}
      image={dropLogoURL}
    />
  </DoubleWidget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignInfo)

