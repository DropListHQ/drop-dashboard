import {
  PreviewWidget,
  PreviewWidgetDescription,
  PreviewWidgetImage,
  PreviewWidgetTitle,
  PreviewWidgetLabel,
  PreviewWidgetButton
} from './styled-components'
import { FC } from 'react'

type TProps = {
  image?: string;
  title?: string;
  description?: string;
}


const PreviewWidgetComponent: FC<TProps> = ({
  image,
  title,
  description
}) => {
  return <PreviewWidget>
    <PreviewWidgetLabel>Claim page preview</PreviewWidgetLabel>
    <PreviewWidgetImage
      src={image}
      alt={title}
    />
    <PreviewWidgetTitle>{title}</PreviewWidgetTitle>
    <PreviewWidgetDescription>{description}</PreviewWidgetDescription>
    <PreviewWidgetButton title='Claim now' onClick={() => {}} />
  </PreviewWidget>
}

export default PreviewWidgetComponent