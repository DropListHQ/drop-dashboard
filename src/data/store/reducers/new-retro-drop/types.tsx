import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TRetroDropStep } from 'types'

export interface NewRetroDropState {
  step: TRetroDropStep,
  title: string | null,
  logoURL?: string | null,
  description?: string | null,
  tokenAddress: string | null,
  dropAddress?: string | null,
  merkleTree: any,
  loading: boolean,
  ipfs: string | null
}

export type NewRetroDropActions = ActionType<typeof actions>;