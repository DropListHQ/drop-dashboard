import React, { FC } from 'react'
import { Breadcrumbs, Button } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Link, LinkContainer, LinkValue, LinkTitle } from './styled-components'
import { copyToClipboard } from 'helpers'
const { REACT_APP_CLAIM_URL } = process.env


interface MatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
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

const CampaignDetails: FC<ReduxType & IProps & RouteComponentProps> = (props) => {
  const { retroDrops, address, match: { params } } = props

  const currentCampaign = retroDrops.find(item => item.ipfsHash === params.id)
  if (!currentCampaign) {
    return null
  }
  const link = `${REACT_APP_CLAIM_URL}/${currentCampaign.ipfsHash}`
  return <div>
    <Breadcrumbs
      path={['My campaigns', currentCampaign.title]}
      description='Manage your campaign and gain insights into your conversion. Share the link to your claim page.'
    />
    <LinkContainer>
      <LinkTitle>Link to claimpage</LinkTitle>
      <Link>
        <LinkValue>{link}</LinkValue>
        <Button
          title='Copy Link'
          size='small'
          onClick={() => copyToClipboard({ value: link })}
        />
      </Link>
    </LinkContainer>
  </div>
}

export default withRouter(connect(mapStateToProps)(CampaignDetails))

