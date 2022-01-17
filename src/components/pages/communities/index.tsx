import { FC, useState } from 'react'
import { Title, CommunityWidget, Input } from 'components/common'
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
  const [ value, setValue ] = useState('')
  const communitiesToShow = value ? communities.filter(item => {
    if (item.name && item.name.includes(value.toLowerCase())) {
      return true
    }
    return false
  }) : communities
  return <div>
    <Container>
      <Title>Selected communities</Title>
      <Text>Select the community you would like to target.</Text>
      <Input placeholder='Search or paste address of NFT' value={value} onChange={value => { setValue(value); return value } }/>
      <CommunitiesContainer>
        {communitiesToShow.map(item => <CommunityWidget
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

