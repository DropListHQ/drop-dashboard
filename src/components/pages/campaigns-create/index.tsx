import { useState, FC, useEffect } from 'react'
import {
  Breadcrumbs
} from 'components/common'

import { TRetroDropStep, TRetroDropType, TRecipientsData } from 'types'
import { RootState } from 'data/store';
import * as newRetroDropActions from 'data/store/reducers/new-retro-drop/actions'

import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import CampaignType from './campaign-type'
import CampaignInfo from './campaign-info'
import CampaignInitial from './campaign-initial'
import CampaignTree from './campaign-tree'
import CampaignDeploy from './campaign-deploy'
import CampaignApproval from './campaign-approval'

const mapStateToProps = ({
  newRetroDrop: { step },
}: RootState) => ({
  step
})

const mapDispatcherToProps = (dispatch: Dispatch<NewRetroDropActions>) => {
  return {
      setStep: (step: TRetroDropStep) => dispatch(newRetroDropActions.setStep(step)),
      setType: (type: TRetroDropType) => dispatch(newRetroDropActions.setType(type))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
type onTypeChoose = (type: TRetroDropType) => void
const defineTitie = (step: TRetroDropStep): string => {
  switch(step) {
    case 'choose_type':
      return 'Specify type of token to be airdropped:'
    case 'initialize':
      return 'Enter your contract address:'
    case 'create_tree':
      return 'Enter recipient addresses and airdrop token IDs'
    case 'publish_ipfs':
      return 'Add details to your campaign:'
    case 'deploy_contract':
      return 'Review details of your campaign and give permission to distribute tokens to DropList:'
    case 'give_approval':
      return `🚀 Are you ready to launch campaign?
      We are ready!`
    default:
      return ''
  }
}

const CampaignsCreate: FC<ReduxType> = ({
  setStep,
  step,
  setType,
}) => {
  const [ currentTokenAddress, setCurrentTokenAddress ] = useState('0x35573543F290fef43d62Ad3269BB9a733445ddab')
  const [ recipientsValue, setRecipientsValue ] = useState('0x70dFbD1149250EDDeAE6ED2381993B517A1c9cE8, 4, 2')
  const [ recipients, setRecipients ] = useState<TRecipientsData>({})
  const [ dropTitle, setDropTitle ] = useState('Test Drop')
  const [ dropLogoURL, setDropLogoURL ] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPS5Lb__A7MNVvat4rHsOWcWQ7yQIF_FIkw&usqp=CAU')
  const [ dropDescription, setDropDescription ] = useState('Test')

  const cancel = () => setStep('choose_type')
  
  const onTypeChoose:onTypeChoose = type => {
    setType(type)
    setStep('initialize')
  }

  useEffect(() => {
    cancel()
    return () => { cancel() }
  }, [])

  const bredcrumbs = <Breadcrumbs
    path={['My campaigns', 'New campaign']}
    description={defineTitie(step)}
    returnAction={() => cancel()}
  />


  const renderWidget = (step: TRetroDropStep) => {
    switch(step) {
      case 'choose_type':
        return <>
          {bredcrumbs}
          <CampaignType onTypeChoose={onTypeChoose} />
        </>
      case 'initialize':
        return <>
          {bredcrumbs}
          <CampaignInitial
            currentTokenAddress={currentTokenAddress}
            dropLogoURL={dropLogoURL}
            dropDescription={dropDescription}
            setCurrentTokenAddress={setCurrentTokenAddress}
            cancel={cancel}
          />
        </>

      case 'create_tree':
        return <>
          {bredcrumbs}
          <CampaignTree
            recipientsValue={recipientsValue}
            setRecipientsValue={setRecipientsValue}
            setRecipients={setRecipients}
            cancel={cancel}
          />
        </>
      case 'publish_ipfs':
        return <>
          {bredcrumbs}
          <CampaignInfo
            dropTitle={dropTitle}
            dropLogoURL={dropLogoURL}
            dropDescription={dropDescription}
            setDropTitle={setDropTitle}
            setDropLogoURL={setDropLogoURL}
            setDropDescription={setDropDescription}
            cancel={cancel}
          />
        </>
      case 'deploy_contract':
        return <>
          {bredcrumbs}
          <CampaignDeploy
            dropTitle={dropTitle}
            recipients={recipients}
            cancel={cancel}
          />
        </>
      case 'give_approval':
        return <>
          {bredcrumbs}
          <CampaignApproval
            recipients={recipients}
            cancel={cancel}
            dropTitle={dropTitle}
            dropLogoURL={dropLogoURL}
            dropDescription={dropDescription}
          />
        </>
      default:
        return null
    }
  }

  return <div>
    {renderWidget(step)}
  </div>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreate)
