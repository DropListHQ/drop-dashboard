import { Dispatch } from 'redux';
import * as actionsContract from './actions';
import * as actionsNewRetroDrop from '../new-retro-drop/actions';
import * as actionsDrops from '../drops/actions';
import { ContractActions } from './types';
import { NewRetroDropActions } from '../new-retro-drop/types';
import { DropsActions } from '../drops/types';
import { ethers } from 'ethers';
import { TMerkleTree, TRecipientsData, TRetroDropType } from 'types'
import { RetroDropContract, ERC1155Contract } from 'abi'

const {
	REACT_APP_FACTORY_ADDRESS = '0x76017073788f352a47374e67323fe4537ca54781',
	REACT_APP_TEMPLATE_ADDRESS = '0xf28565dc20a66e5f1904a816c38958d6b55186eb'
} = process.env

export async function createDrop(
	dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions>,
	provider: any,
	merkleTree: TMerkleTree,
	tokenAddress: string,
	ipfsHash: string
) {
  dispatch(actionsContract.setLoading(true))
	const drop = await deploy(provider, merkleTree, tokenAddress, ipfsHash)
	dispatch(actionsNewRetroDrop.setDropAddress(drop))
	dispatch(actionsContract.setLoading(false))
	dispatch(actionsNewRetroDrop.setStep('give_approval'))
}

const deploy = async (
	provider: any,
	merkleTree: TMerkleTree,
	tokenAddress: string,
	ipfsHash: string
) => {
	const signer = await provider.getSigner()
	const ipfs = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ipfsHash))
	const proxyContract = await new ethers.Contract(REACT_APP_FACTORY_ADDRESS, RetroDropContract, signer)
  await proxyContract.createDrop(
		REACT_APP_TEMPLATE_ADDRESS,
		tokenAddress,
		merkleTree.merkleRoot,
		Math.round(Number(new Date()) / 1000),
		ipfs,
		ipfs
	)
	
	const checkReceipt = async function (): Promise<string> {
		return new Promise((resolve, reject) => {
			proxyContract.on("CreateDrop", (drop: string, token: string, ipfsHash: string, event) => { 
				if (ipfsHash === ipfs) {
					resolve(drop)
				}
		 })
		})
	}
	return await checkReceipt()
}

export async function approve(
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
	const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract, signer)
	await contractInstance.setApprovalForAll(dropAddress, true)
	const checkReceipt = async function (): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const interval = setInterval(async function () {
				const isApproved = await contractInstance.isApprovedForAll(userAddress, dropAddress)
				if (isApproved) {
					clearInterval(interval)
					resolve(true)
				}
			}, 3000)
		})
	}
	const approved = await checkReceipt()
	if (approved) {
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
