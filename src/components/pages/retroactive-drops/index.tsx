import React, { FC } from 'react'
import { Tag, Campaign, Title } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Container } from './styled-components'

const mapStateToProps = ({
  drops: { retroDrops },
  user: { address }
}: RootState) => ({
  retroDrops,
  address
})

type ReduxType = ReturnType<typeof mapStateToProps>

const RetroactiveDrops: FC<ReduxType> = ({ retroDrops, address }) => {
  const history = useHistory()
  const currentCampaigns = retroDrops.filter(item => item.address === address)
  return <div>
    {currentCampaigns.length > 0 && <Container>
      <Title>Current Campaigns</Title>
      {currentCampaigns.map(item => {
        return <Campaign
          title={item.title}
          type='current'
          chainId={item.chainId}
          description={item.description}
          subtitle='ERC1155'
          buttonTitle='Open'
          action={() => {
            window.open(`https://gateway.pinata.cloud/ipfs/${item.ipfsHash}`, '_blank')
          }}
        />
      })}
    </Container>}
    <Container>
      <Title>New Campaigns</Title>
      <Campaign
        title='ERC1155'
        type='draft'
        chainId={1}
        subtitle='ethereum'
        description='Make a retrodrop to major crypto communities and collectors'
        buttonTitle='Continue'
        action={() => {
          history.push('/retroactive-drops/create')
        }}
      />
    </Container>
  </div>
}

export default connect(mapStateToProps)(RetroactiveDrops)

