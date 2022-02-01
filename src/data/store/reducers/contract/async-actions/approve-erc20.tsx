import { Dispatch } from 'redux';
import * as actionsContract from '../actions';
import * as actionsDrops from 'data/store/reducers/drops/actions';
import { ContractActions } from '../types';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types';
import { DropsActions } from 'data/store/reducers/drops/types';
import { ethers, utils } from 'ethers';
import { TRecipientsData, TRetroDropType } from 'types'
import { ERC20Contract } from 'abi'

export default async function approveERC1155(
	dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions> & Dispatch<DropsActions>,
	provider: any,
	tokenAddress: string,
	userAddress: string,
	dropAddress: string,
	ipfsHash: string,
	title: string,
	address: string,
	chainId: number,
	description: string,
	logoURL: string,
	recipients: TRecipientsData,
	type: TRetroDropType,
	callback: () => void
) {
  dispatch(actionsContract.setLoading(true))
  const signer = await provider.getSigner()
  const gasPrice = await provider.getGasPrice()
  const oneGwei = ethers.utils.parseUnits('1', 'gwei')
  const tokenAmount = Object.values(recipients).reduce((sum, item) => sum + item.amount, 0)
	const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract, signer)
	const decimals = await contractInstance.decimals()
  const amountFormatted = utils.parseUnits(String(tokenAmount), decimals)
  let iface = new ethers.utils.Interface(ERC20Contract);
  const data = await iface.encodeFunctionData('approve', [dropAddress, amountFormatted])
	await signer.sendTransaction({
    to: tokenAddress,
    gasPrice: gasPrice.add(oneGwei),
    from: userAddress,
    value: 0,
    data: data
  })

  const transaction = async function (): Promise<boolean> {
		return new Promise((resolve, reject) => {
			setInterval(async () => {
				const allowed = await contractInstance.allowance(userAddress, dropAddress)
				if (Number(allowed) >= Number(amountFormatted)) {
					resolve(true)
				}
			}, 3000)
		})
	}
  const finished = await transaction()
	if (finished) {
		alert(`DONE: ${ipfsHash}`)
		dispatch(actionsDrops.addNewRetroDrop({
			title,
			ipfsHash,
			address,
			chainId,
			description,
			logoURL,
			status: 'active',
			tokenAddress,
			recipients,
			type
		}))
		if (callback) { callback() }
	}
	
	dispatch(actionsContract.setLoading(false))
}
