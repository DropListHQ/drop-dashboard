import React, { FC } from 'react'
import cn from 'classnames'
import {
  Widget,
  WidgetImage,
  WidgetTitle,
  WidgetText,
  WidgetButton,
  WidgetIcon,
  buttonClass
} from './styled-components'


type TCommunityWidget = {
  title: string,
  description: string,
  action: () => void,
  image?: string,
  icon?: React.ReactNode,
  buttonTitle: string,
  inverted?: boolean
}
const CommunityWidget: FC<TCommunityWidget> = ({ title, description, action, buttonTitle, inverted, image, icon }) => {
  return <Widget inverted={inverted}>
    {icon ? <WidgetIcon>
      {icon}
    </WidgetIcon> : <WidgetImage src={image} alt={title} />}
    <WidgetTitle>{title}</WidgetTitle>
    <WidgetText>{description}</WidgetText>
    <WidgetButton className={buttonClass} onClick={action}>{buttonTitle}</WidgetButton>
  </Widget>
}

export default CommunityWidget