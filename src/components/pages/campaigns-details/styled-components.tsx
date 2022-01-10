import styled from 'styled-components'

export const LinkContainer = styled.div`
  padding: 16px 16px 36px;
  max-width: 460px;
  background: ${props => props.theme.blankColor};
  border-radius: 8px;
`

export const Link = styled.div`
  padding: 0px;
  width: 100%;
  border-radius: 8px;
  height: 44px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  font-size: 16px;
  color: ${props => props.theme.primaryTextColor};
  padding: 14px 16px 10px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`

export const LinkValue = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`

export const LinkTitle = styled.h3`
  color: ${props => props.theme.primaryTextColor};
  font-weight: 700;
  font-size: 12px;
  margin: 0px 0px 4px;
`