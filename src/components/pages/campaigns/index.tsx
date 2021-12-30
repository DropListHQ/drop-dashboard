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
  user: { address }
}: RootState) => ({
  retroDrops,
  address
})

type ReduxType = ReturnType<typeof mapStateToProps>

const RetroactiveDrops: FC<ReduxType & TProps> = ({ retroDrops, address, connectWallet }) => {
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
    </Container>
  </div>
}

export default connect(mapStateToProps)(RetroactiveDrops)

