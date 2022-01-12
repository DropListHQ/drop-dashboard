import styled from 'styled-components'

export const WidgetComponent = styled.div`
  max-width: 460px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  padding: 19px 16px 24px;
`
