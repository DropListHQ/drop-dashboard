import React, { FC } from 'react'

import {
    Campaign,
    CampaignSubtitle,
    CampaignTitle,
    CampaignDescription
} from './styled-components'

import Button from '../button'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'

interface Props {
    title: string,
    type: 'draft' | 'new' | 'current' | 'finished',
    chainId: number,
    subtitle?: string,
    buttonTitle: string,
    description?: string,
    total?: number,
    claimed?: number,
    action: () => void
}

const CampaignComponent: FC<Props> = ({
  type = 'new',
  title,
  chainId = 1,
  buttonTitle = 'Create',
  action = () => console.log('hello world!'),
  subtitle,
  description,
  total,
  claimed = ''
}) => {

    const button = <Button
      title={buttonTitle}
      size='small'
      onClick={action}
    />
  
    const defineTemplate = (type: string) => {
      switch(type) {
        case 'draft':
          return <>
            <CampaignSubtitle>{subtitle}</CampaignSubtitle>
            <CampaignTitle>{title}</CampaignTitle>
            {description && <CampaignDescription>{description}</CampaignDescription>}
            {button}
          </>
        default:
          return <>
            {subtitle && <CampaignSubtitle>{subtitle}</CampaignSubtitle>}
            <CampaignTitle>{title}</CampaignTitle>
            {description && <CampaignDescription>{description}</CampaignDescription>}
            {button}
          </>
      }
    }
    return <ThemeProvider theme={themes.light}>
        <Campaign>
          {defineTemplate(type)}
        </Campaign>
    </ThemeProvider>
}

export default CampaignComponent
