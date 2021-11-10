import styled from 'styled-components'

export const WidgetComponent = styled.div`
  max-width: 460px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 19px 16px 24px;
`

interface WidgetTitleProps {
}

export const WidgetTitle = styled.h3<WidgetTitleProps>`
  font-family: Inter;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  margin: 0 0 24px 0px;
`
export const WidgetSubtitle = styled.h4`
  font-family: Inter;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin: 0 0 24px 0px;
  color: ${props => props.theme.primaryTextColor};
`