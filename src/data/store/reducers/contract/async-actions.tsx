import { Dispatch } from 'redux';
import * as actionsContract from './actions';
import * as actionsNewRetroDrop from '../new-retro-drop/actions';
import * as actionsDrops from '../drops/actions';
import { ContractActions } from './types';
import { NewRetroDropActions } from '../new-retro-drop/types';
import { DropsActions } from '../drops/types';
import { ethers } from 'ethers';
import { TMerkleTree, TRecipientsData, TRetroDropType } from 'types'
import { ERC1155Contract } from 'abi'
import contracts from 'configs/contracts'
import { DropFactoryInterface } from '@drop-protocol/drop-sdk'
import { hexlifyIpfsHash } from 'helpers'

const DECEMBER_31_2325 = 11234234223 // Thursday, December 31, 2325 8:37:03 PM

export async function createDrop(
	dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions>,
	provider: any,
	merkleTree: TMerkleTree,
	tokenAddress: string,
	ipfsHash: string,
	chainId: number,
	type: TRetroDropType
) {
  dispatch(actionsContract.setLoading(true))
	const contractData = contracts[chainId]
	const factoryAddress = contractData.factory
	const templateAddress = contractData[type]
	let drop
	if (type === 'erc1155') {
		drop = await deployERC1155(provider, merkleTree, tokenAddress, ipfsHash, factoryAddress, templateAddress)
	} else {
		drop = await deployERC1155(provider, merkleTree, tokenAddress, ipfsHash, factoryAddress, templateAddress)
	}
	dispatch(actionsNewRetroDrop.setDropAddress(drop))
	dispatch(actionsContract.setLoading(false))
	dispatch(actionsNewRetroDrop.setStep('give_approval'))
}

const deployERC1155 = async (
	provider: any,
	merkleTree: TMerkleTree,
	tokenAddress: string,
	ipfsHash: string,
	factoryAddress: string,
	templateAddress: string
) => {
	const signer = await provider.getSigner()
	const proxyContract = await new ethers.Contract(factoryAddress, DropFactoryInterface, signer)
	const ipfsHexlified = hexlifyIpfsHash(ipfsHash)
  await proxyContract.createDrop(
		templateAddress,
		tokenAddress,
		merkleTree.merkleRoot,
		DECEMBER_31_2325,
		ipfsHexlified
	)
	
	const checkReceipt = async function (): Promise<string> {
		return new Promise((resolve, reject) => {
			proxyContract.on("CreateDrop", (
				drop: string,
				token: string,
				template: string,
				expiration: any,
				ipfs: string,
				event
			) => { 
				if (ipfsHexlified === ipfs) {
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
