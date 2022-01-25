import React, { FC } from 'react'
import { MiniWidget, Title } from 'components/common'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Container } from './styled-components'
import { TRetroDropType } from 'types'

const mapStateToProps = ({
  drops: { retroDrops },
  user: { address }
}: RootState) => ({
  retroDrops,
  address
})

type TProps = {
  onTypeChoose: (type: TRetroDropType) => void
}

type ReduxType = ReturnType<typeof mapStateToProps>

const RetroactiveDrops: FC<ReduxType & TProps> = ({ onTypeChoose }) => {
  return <div>
    <Container>
      <Title>New Campaigns</Title>
      <MiniWidget
        title='ERC1155'
        subtitle='ethereum'
        description='Make a retrodrop to major crypto communities and collectors'
        buttonTitle='Continue'
        action={() => {
          onTypeChoose('erc1155')
        }}
      />
      <MiniWidget
        title='ERC721'
        subtitle='ethereum'
        description='Make a retrodrop to major crypto communities and collectors'
        buttonTitle='Continue'
        action={() => {
          onTypeChoose('erc721')
        }}
      />
      {false && <MiniWidget
        title='ERC20'
        subtitle='ethereum'
        description='Make a retrodrop to major crypto communities and collectors'
        buttonTitle='Continue'
        action={() => {
          onTypeChoose('erc20')
        }}
      />}
    </Container>
  </div>
}

export default connect(mapStateToProps)(RetroactiveDrops)
