import React, { FC } from 'react'
import { Campaign, Title, CommunityWidget } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { Campaigns } from './styled-components'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Container, Text } from './styled-components'
import { copyToClipboard } from 'helpers'
import Icons from 'icons';
import { useHistory } from 'react-router-dom'
const { REACT_APP_CLAIM_URL } = process.env

const mapStateToProps = ({
  drops: { retroDrops },
  user: { address }
}: RootState) => ({
  retroDrops,
  address
})

type ReduxType = ReturnType<typeof mapStateToProps>

const RetroactiveDrops: FC<ReduxType> = ({ retroDrops, address }) => {
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
            link=''
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
        buttonTitle='Connect wallet and start'
        action={() => {
          history.push('/campaigns/new')
        }}
        icon={<Icons.LinkdropWhiteLogo />}
      />
    </Container>
  </div>
}

export default connect(mapStateToProps)(RetroactiveDrops)

