import { FC } from 'react'
import { Campaign, CampaignStatus, CampaignTitle, CampaignImage, CampaignButton } from './styled-components'
import { copyToClipboard } from 'helpers'
const { REACT_APP_CLAIM_URL } = process.env

type TProps = {
  status: 'active' | 'stopped' | 'draft',
  title: string,
  image: string,
  id: string
}

const CampaignComponent: FC<TProps> = ({
  title,
  image,
  id,
  status
}) => {
  return <Campaign>
    <CampaignStatus status={status}>{status}</CampaignStatus>
    <CampaignImage src={image} />
    <CampaignTitle>{title}</CampaignTitle>
    <CampaignButton
      onClick={() => window.open(`${REACT_APP_CLAIM_URL}/${id}`, '_blank')}
      title="Campaign’s Details"
      appearance='inverted'
    />
    <CampaignButton
      title='Share Link'
      onClick={() => copyToClipboard({ value: `${REACT_APP_CLAIM_URL}/${id}` })}
      appearance='inverted'
    />
      
  </Campaign>
}

export default CampaignComponent