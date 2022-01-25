import { FC } from 'react'
import {
  Widget
} from 'components/common'
import {
  WidgetInput,
  WidgetControls,
  WidgetButton
} from '../styled-compoents'
import { TRetroDropStep } from 'types'
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import * as newRetroDropActions from 'data/store/reducers/new-retro-drop/actions'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'

type TProps = {
  currentTokenAddress: string,
  dropLogoURL: string,
  dropDescription: string,
  setCurrentTokenAddress: (value: string) => void,
  cancel: () => void
}

const mapDispatcherToProps = (dispatch: Dispatch<NewRetroDropActions>) => {
  return {
    setStep: (step: TRetroDropStep) => dispatch(newRetroDropActions.setStep(step)),
    setTokenAddress: (tokenAddress: string) => dispatch(newRetroDropActions.setTokenAddress(tokenAddress)),
  }
}
type ReduxType = ReturnType<typeof mapDispatcherToProps> & TProps

const CampaignInfo: FC<ReduxType> = ({
  currentTokenAddress,
  cancel,
  setCurrentTokenAddress,
  setTokenAddress,
  setStep
}) => {
  return <Widget>
    <WidgetInput
      title='Token’s address'
      onChange={value => { setCurrentTokenAddress(value); return value}}
      value={currentTokenAddress}
    />
    <WidgetControls>
      <WidgetButton
        title='Cancel'
        appearance='inverted'
        onClick={cancel}
      />
      <WidgetButton
        title='Continue'
        disabled={currentTokenAddress.length !== 42}
        onClick={() => {
          setTokenAddress(currentTokenAddress)
          setStep('create_tree')
        }}
      />
    </WidgetControls>
  </Widget>
}

export default connect(null, mapDispatcherToProps)(CampaignInfo)