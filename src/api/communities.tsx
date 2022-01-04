import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.studio.thegraph.com/query/9597/dropowners1/0.0.22'
});

const getCommunityData = async (contract: string) => {
  const response = await instance.post('/', {
    query: `query NftOwners($contract: String) {
      nftContracts(first: 1,
        where:{id:$contract}
      ) {
        id
        name
        numTokens numOwners
      }
    }`,
    variables: { contract }
  })
  return response
}

const communities = {
  getCommunityData
}

export default communities
