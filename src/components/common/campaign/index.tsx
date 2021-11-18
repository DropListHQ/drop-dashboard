import React, { FC } from 'react'

import {
    Campaign,
    CampaignSubtitle,
    CampaignTitle,
    CampaignDescription,
    Buttons,
    ButtonComponent
} from './styled-components'

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
    action: () => void,
    secondaryAction?: () => void,
    secondaryButtonTitle?: string
}

const CampaignComponent: FC<Props> = ({
  type = 'new',
  title,
  chainId = 1,
  buttonTitle = 'Create',
  action = () => console.log('hello world!'),
  secondaryAction,
  subtitle,
  description,
  total,
  claimed = '',
  secondaryButtonTitle
}) => {

    const button = <ButtonComponent
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
        case 'current':
          return <>
            {subtitle && <CampaignSubtitle>{subtitle}</CampaignSubtitle>}
            <CampaignTitle>{title}</CampaignTitle>
            {description && <CampaignDescription>{description}</CampaignDescription>}
            <Buttons>
              {secondaryAction && secondaryButtonTitle && <ButtonComponent
                title={secondaryButtonTitle}
                size='small'
                appearance='inverted'
                onClick={secondaryAction}
              />}
              {button}
            </Buttons>
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
