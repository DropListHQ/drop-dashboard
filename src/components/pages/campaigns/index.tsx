import React, { FC } from 'react'
import { Campaign, Title, CommunityWidget } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { Campaigns } from './styled-components'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Container, Text } from './styled-components'
import Icons from 'icons';
import { useHistory } from 'react-router-dom'



type TProps = {
  connectWallet: () => void
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

type ReduxType = ReturnType<typeof mapStateToProps>

const CampaignsPage: FC<ReduxType & TProps> = ({ retroDrops, address, connectWallet, communities }) => {
  const currentCampaigns = retroDrops.filter(item => item.address === address)
  const history = useHistory()
  return <div>
    {currentCampaigns.length > 0 && <Container>
      <Title>Current Campaigns</Title>
      <Campaigns>
        {currentCampaigns.map(item => {
          return <Campaign
            title={item.title}
            status={item.status || 'active'}
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
          description={`${item.numOwners} holders`}
          buttonTitle='Download .csv'
          action={() => {
            console.log('hello')
          }}
          disabled
        />)}
      </Campaigns>
    </Container>
  </div>
}

export default connect(mapStateToProps)(CampaignsPage)

