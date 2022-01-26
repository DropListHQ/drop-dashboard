import {
  PreviewWidget,
  PreviewWidgetDescription,
  PreviewWidgetImage,
  PreviewWidgetTitle,
  PreviewWidgetLabel,
  PreviewWidgetButton,
  PreviewWidgetBlank
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
    {image ? <PreviewWidgetImage
      src={image}
      alt={title}
    /> : <PreviewWidgetBlank />}
    <PreviewWidgetTitle>{title}</PreviewWidgetTitle>
    <PreviewWidgetDescription>{description}</PreviewWidgetDescription>
    <PreviewWidgetButton title='Claim now' onClick={() => {}} />
  </PreviewWidget>
}

export default PreviewWidgetComponent