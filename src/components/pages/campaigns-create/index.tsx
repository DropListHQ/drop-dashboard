import { useState, FC, useEffect } from 'react'
import {
  Widget,
  DataBlock,
  Breadcrumbs
} from 'components/common'
import { parseRecipientsData, parseBalanceMap, defineNetworkName, capitalize } from 'helpers'
import { useHistory } from 'react-router-dom'
import {
  WidgetInput,
  WidgetTextarea,
  WidgetControls,
  WidgetButton,
  WidgetDataSplit,
  WidgetDataBlock
} from './styled-compoents'

import { TMerkleTree, TRetroDropStep, TRetroDropType, TRecipientsData } from 'types'
import { RootState } from 'data/store';
import * as newRetroDropAsyncActions from 'data/store/reducers/new-retro-drop/async-actions'
import * as newRetroDropActions from 'data/store/reducers/new-retro-drop/actions'
import * as newContractAsyncActions from 'data/store/reducers/contract/async-actions'
import { ContractActions } from 'data/store/reducers/contract/types'
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CampaignType from './campaign-type'

const mapStateToProps = ({
  user: { address, provider, chainId },
  contract: { loading: contractLoading },
  newRetroDrop: { loading, step, tokenAddress, ipfs, merkleTree, dropAddress, type },
}: RootState) => ({
  loading,
  address,
  contractLoading,
  provider,
  ipfs,
  step,
  tokenAddress,
  merkleTree,
  chainId,
  dropAddress,
  type
})



const mapDispatcherToProps = (dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions>) => {
  return {
      createIPFS: (data: any, title: string, description: string, logoURL: string, tokenAddress: string, chainId: number) => newRetroDropAsyncActions.createIPFS(dispatch, data, title, description, logoURL, tokenAddress, chainId),
      createDrop: (
        provider: any,
        merkleTree: TMerkleTree,
        tokenAddress: string,
        ipfsHash: string
      ) => newContractAsyncActions.createDrop(dispatch, provider, merkleTree, tokenAddress, ipfsHash),
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
      setStep: (step: TRetroDropStep) => dispatch(newRetroDropActions.setStep(step)),
      setType: (type: TRetroDropType) => dispatch(newRetroDropActions.setType(type)),
      setTokenAddress: (tokenAddress: string) => dispatch(newRetroDropActions.setTokenAddress(tokenAddress)),
      setMerkleTree: (merkleTree: any) => dispatch(newRetroDropActions.setMerkleTree(merkleTree)),
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
  address,
  provider,
  loading,
  contractLoading,
  chainId,


  createIPFS,
  ipfs,

  setStep,
  step,

  setType,
  type,

  setTokenAddress,
  tokenAddress,

  merkleTree,
  setMerkleTree,

  dropAddress,

  createDrop,
  approve
}) => {
  const [ currentTokenAddress, setCurrentTokenAddress ] = useState('0x35573543F290fef43d62Ad3269BB9a733445ddab')
  const [ recipientsValue, setRecipientsValue ] = useState('0x70dFbD1149250EDDeAE6ED2381993B517A1c9cE8, 1, 1, 1')
  const [ recipients, setRecipients ] = useState<TRecipientsData>({})
  const [ dropTitle, setDropTitle ] = useState('Test Drop')
  const [ dropLogoURL, setDropLogoURL ] = useState('https://eattherich.shop')
  const [ dropDescription, setDropDescription ] = useState('Test')

  const cancel = () => setStep('choose_type')
  const history = useHistory()
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
          <Widget>
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
        </>

      case 'create_tree':
        return <>
          {bredcrumbs}
          <Widget>
            <WidgetTextarea
              title='Receiver address, token ID, amount, max supply'
              onChange={value => { setRecipientsValue(value); return value}}
              value={recipientsValue}
              placeholder={`Be careful and paste here info in the following order:

Receiver address, token ID, amount, max supply

Max supply — maximum amount of tokens that you would like to distribute. Max supply value should be equal for lines with an equal token ID

0x70dfbd1149250eddeae6ed2381993b517a1c9ce8, 1, 1, 3
0x203477162865dd22488a60e3e478e7795af95052, 2, 1, 1
0x2693ad693d042b9c04d2dce0a44a7608ea1f7d47, 1, 2, 3

and so on
              `}
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
                  // if (!type) return
                  const type = 'erc1155'
                  const recipientsData = parseRecipientsData(type, recipientsValue)
                  console.log({ recipientsData })
                  if (!recipientsData) {
                    return alert('Please check format for ERC1155')
                  }
                  setRecipients(recipientsData)
                  const merkleData = parseBalanceMap(recipientsData)
                  setMerkleTree(merkleData)
                  setStep('publish_ipfs')
                }}
              />
            </WidgetControls>
          </Widget>
        </>
        case 'publish_ipfs':
          return <>
            {bredcrumbs}
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
          </>
        case 'deploy_contract':
          return <>
            {bredcrumbs}
            <Widget>
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
                text={currentTokenAddress}
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
          </>
        case 'give_approval':
          return <>
            {bredcrumbs}
            <Widget>
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
                text={currentTokenAddress}
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
