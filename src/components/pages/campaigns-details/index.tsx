import { FC } from 'react'
import { Breadcrumbs, Button, DataBlock } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Link, LinkContainer, LinkValue, LinkTitle, InfoBlockStyled, WidgetDataSplit, InfoBlockContainer, Description, WidgetContainer } from './styled-components'
import { copyToClipboard } from 'helpers'
import { useHistory } from 'react-router-dom'
import { defineNetworkName, capitalize } from 'helpers'

const { REACT_APP_CLAIM_URL } = process.env

type TReduceTokens = {
  [tokenId: string]: number
}

interface MatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
  connectWallet: () => void;
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
  const { retroDrops, match: { params } } = props
  const history = useHistory()

  const currentCampaign = retroDrops.find(item => item.ipfsHash === params.id)
  if (!currentCampaign) {
    return null
  }
  const { ipfsHash, recipients, title, chainId, tokenAddress, type } = currentCampaign
  const link = `${REACT_APP_CLAIM_URL}/${ipfsHash}`
  
  const tokens = recipients && Object.values(recipients).reduce<TReduceTokens>((sum, item) => {
    sum[item.tokenId] = (sum[item.tokenId] || 0) + Number(item.amount)
    return sum
  }, {})

  return <div>
    <Breadcrumbs
      path={['My campaigns', currentCampaign.title]}
      description='Manage your campaign and gain insights into your conversion. Share the link to your claim page.'
      returnAction={() => history.push('/')}
    />
    <InfoBlockContainer>
      {recipients && <InfoBlockStyled
        title='Unique Wallets'
      >
        {Object.keys(recipients).length}
      </InfoBlockStyled>}
    </InfoBlockContainer>
    <Description>
      <WidgetContainer>
        <DataBlock title='Drop’s title' text={title} />
        <WidgetDataSplit>
          <DataBlock title='Network' text={capitalize(defineNetworkName(chainId))} />
          <DataBlock title='Type of token' text={type} />
        </WidgetDataSplit>
        <DataBlock title='Token address' text={tokenAddress} />
        {tokens && <WidgetDataSplit>
          <DataBlock title='Token ID' text={Object.keys(tokens).join(', ')} />
          <DataBlock title='Total amount' text={Object.values(tokens).reduce((a, b) => a + b, 0)} />
        </WidgetDataSplit>}
      </WidgetContainer>

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
    </Description>
  </div>
}

export default withRouter(connect(mapStateToProps)(CampaignDetails))

