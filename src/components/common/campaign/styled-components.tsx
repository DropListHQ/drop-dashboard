import styled from 'styled-components';
    
const Campaign = styled.div`
  max-width: 300px;
  width: 100%;
  padding: 24px 16px 18px;
  background-color: ${props => props.theme.blankColor};
  border-radius: 8px;
  margin-bottom: 20px;
`

const CampaignSubtitle = styled.h3`
  margin-bottom: 6px;
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.noteTextColor};
  margin-top: 0;
  font-weight: 400;
`
const CampaignTitle = styled.h2`
  color: ${props => props.theme.primaryTextColor};
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  margin-top: 0;

`

const CampaignDescription = styled.p`
  margin-top: 0;
  font-size: 14px;
  color: ${props => props.theme.primaryTextColor}
`

export {
  Campaign, CampaignTitle, CampaignSubtitle, CampaignDescription
}