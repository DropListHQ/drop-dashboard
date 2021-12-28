import { FC } from 'react'
import { Campaign, CampaignStatus, CampaignTitle, CampaignImage } from './styled-components'


type TProps = {
  status: 'active' | 'stopped' | 'draft',
  title: string,
  link: string,
  image: string,
  id: string
}

const CampaignComponent: FC<TProps> = ({
  title,
  link,
  image,
  id,
  status
}) => {
  return <Campaign>
    <CampaignStatus status={status}>{status}</CampaignStatus>
    <CampaignImage src={image} />
    <CampaignTitle>{title}</CampaignTitle>
  </Campaign>
}

export default CampaignComponent