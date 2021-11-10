import React, { FC } from 'react'
import { WidgetComponent, WidgetTitle, WidgetSubtitle } from './styled-components'

interface Props {
  title: string,
  subtitle?: string
}

const Widget: FC<Props> = ({ children, title, subtitle }) => {
  return <WidgetComponent>
    <WidgetTitle>{title}</WidgetTitle>
    {subtitle && <WidgetSubtitle>{subtitle}</WidgetSubtitle>}
    {children}
  </WidgetComponent>
}

export default Widget