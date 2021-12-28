import React, { FC } from 'react'
import { WidgetComponent } from './styled-components'

interface Props {
  title: string,
  subtitle?: string
}

const Widget: FC<Props> = ({ children, title, subtitle }) => {
  return <WidgetComponent>
    {children}
  </WidgetComponent>
}

export default Widget