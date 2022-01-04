import React, { FC } from 'react'
import { Campaign, Title, CommunityWidget } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { Campaigns } from './styled-components'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Container, Text } from './styled-components'
import * as communityAsyncActions from 'data/store/reducers/communities/async-actions'
import Icons from 'icons';
import { useHistory } from 'react-router-dom'
import { Dispatch } from 'redux';
import { CommunitiesActions } from 'data/store/reducers/communities/types'
import { TCommunities } from 'data/store/reducers/communities/types';


type TProps = {
  connectWallet: () => void
}

const mapDispatcherToProps = (dispatch: Dispatch<CommunitiesActions>) => {
  return {
    getCommunityData: (contractAddress: string, communities: TCommunities) => communityAsyncActions.getCommunityData(dispatch, contractAddress, communities)
  }
}


const mapStateToProps = ({
  drops: { retroDrops },
  user: { address },
  communities: { communities }
}: RootState) => ({
  retroDrops,
  address,
  communities
})

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const RetroactiveDrops: FC<ReduxType & TProps> = ({ retroDrops, address, connectWallet, getCommunityData, communities }) => {
  const currentCampaigns = retroDrops.filter(item => item.address === address)
  const history = useHistory()
  return <div>
    {currentCampaigns.length > 0 && <Container>
      <Title>Current Campaigns</Title>
      <Campaigns>
        {currentCampaigns.map(item => {
          return <Campaign
            title={item.title}
            status='active'
            image={item.logoURL}
            id={item.ipfsHash}
            key={item.ipfsHash}
          />
        })}
      </Campaigns>
    </Container>}
    <Container>
      <Title>New Campaign</Title>
      <Text>Choose the community you would like to drop your tokens to, and upload your custom set of addresses via .csv file</Text>
      <Campaigns>
        <CommunityWidget
          title='Custom community'
          description='Provide addresses via .csv file'
          inverted
          buttonTitle={!address ? 'Connect wallet and start' : 'Start'}
          action={() => {
            address ? history.push('/campaigns/new') : connectWallet()
          }}
          icon={<Icons.LinkdropWhiteLogo />}
        />

        {communities.map(item => <CommunityWidget
          title={item.name || 'Loading'}
          description='666 holders'
          actionOnLoad={() => {
            getCommunityData(item.id, communities)
          }}
          buttonTitle='Download .csv'
          action={() => {
            console.log('hello')
          }}
        />)}
      </Campaigns>
    </Container>
  </div>
}

export default connect(mapStateToProps, mapDispatcherToProps)(RetroactiveDrops)

