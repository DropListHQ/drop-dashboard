import { FC, useState } from 'react'
import {
  Widget
} from 'components/common'
import {
  WidgetInput,
  WidgetControls,
  WidgetButton
} from '../styled-compoents'
import { TRetroDropStep, TRetroDropType } from 'types'
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import * as newRetroDropActions from 'data/store/reducers/new-retro-drop/actions'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { RootState } from 'data/store';

type TProps = {
  dropLogoURL: string,
  dropDescription: string,
  cancel: () => void
}

const mapStateToProps = ({
  newRetroDrop: { type }
}: RootState) => ({
  type
})

const mapDispatcherToProps = (dispatch: Dispatch<NewRetroDropActions>) => {
  return {
    setStep: (step: TRetroDropStep) => dispatch(newRetroDropActions.setStep(step)),
    setTokenAddress: (tokenAddress: string) => dispatch(newRetroDropActions.setTokenAddress(tokenAddress)),
  }
}
type ReduxType = ReturnType<typeof mapDispatcherToProps> & TProps & ReturnType<typeof mapStateToProps>

type TCreateDefaultTokenAddress = (dropType: TRetroDropType | null) => string

const createDefaultTokenAddress: TCreateDefaultTokenAddress = (type) => {
  return ''
  // switch (type) {
  //   case 'erc1155':
  //     return '0x35573543F290fef43d62Ad3269BB9a733445ddab'
  //   case 'erc721':
  //     return '0x29a0a05fcc86e27442d4a0b1b498e71f78b6c459'
  //   case 'erc20':
  //     return '0xaFF4481D10270F50f203E0763e2597776068CBc5'
  //   default:
  //     return ''
  // }
}

const CampaignInfo: FC<ReduxType> = ({
  cancel,
  setTokenAddress,
  setStep,
  type
}) => {
  const [ currentTokenAddress, setCurrentTokenAddress ] = useState(createDefaultTokenAddress(type))
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

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignInfo)