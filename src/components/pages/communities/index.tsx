import React, { FC } from 'react'
import { Title, CommunityWidget } from 'components/common'
import { CommunitiesContainer } from './styled-components'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Container, Text } from './styled-components'
import * as communitiesAsyncActions from 'data/store/reducers/communities/async-actions'
import { CommunitiesActions } from 'data/store/reducers/communities/types'
import { Dispatch } from 'redux';

type TProps = {
  connectWallet: () => void
}

const mapStateToProps = ({
  user: { address },
  communities: { communities }
}: RootState) => ({
  address,
  communities
})

// const getOwnersData

const mapDispatcherToProps = (dispatch: Dispatch<CommunitiesActions>) => {
  return {
    getOwnersData: (contract: string) => communitiesAsyncActions.getOwnersData(dispatch, contract)
  }
}

type ReduxType = ReturnType<typeof mapStateToProps>  & ReturnType<typeof mapDispatcherToProps>

const Communities: FC<ReduxType & TProps> = ({ address, connectWallet, communities, getOwnersData }) => {
  return <div>
    <Container>
      <Title>Selected communities</Title>
      <Text>Select the community you would like to target.</Text>
      <CommunitiesContainer>
        {communities.map(item => <CommunityWidget
          title={item.name || 'Loading'}
          key={item.id}
          description={`${item.numOwners} holders`}
          buttonTitle='Download .csv'
          action={() => {
            // console.log('hello')
            getOwnersData(item.id)
          }}
        />)}
      </CommunitiesContainer>
    </Container>
  </div>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Communities)

