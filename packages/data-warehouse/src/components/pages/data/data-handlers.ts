import { SubscriptionModel } from '@reapit/foundations-ts-definitions'
import { SetStateAction, Dispatch } from 'react'
import { MessageState } from '../../../context/message-context'
import { getDataSetsService } from '../../../services/data-sets'
import { createRequestService } from '../../../services/requests'
import { deleteSharesService, getSharesService } from '../../../services/shares'
import { PagedApiResponse } from '../../../types/core'
import { DataSetModel } from '../../../types/data-sets'
import { SharesModel } from '../../../types/shares'

export const createRequest = (
  setMessageState: Dispatch<SetStateAction<MessageState>>,
  setCreatingShare: Dispatch<SetStateAction<string>>,
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>,
  value: string,
) => async () => {
  setCreatingShare(value)

  const createdShare = await createRequestService(value)

  setCreatingShare('')

  if (!createdShare) {
    return setMessageState({ errorMessage: 'Something went wrong creating share, please try again' })
  }

  setMessageState({ infoMessage: 'Successfully created a share' })

  const shares = await getSharesService()
  if (shares) {
    return setShares(shares)
  }
  return setMessageState({ errorMessage: 'Something went wrong fetching shares, please try refreshing' })
}

export const deleteShare = (
  setMessageState: Dispatch<SetStateAction<MessageState>>,
  setDeletingShare: Dispatch<SetStateAction<string>>,
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>,
  value: string,
) => async () => {
  setDeletingShare(value)

  const disabled = await deleteSharesService(value)

  setDeletingShare('')

  if (!disabled) {
    return setMessageState({ errorMessage: 'Something went wrong deleting this data share' })
  }

  setMessageState({ infoMessage: 'Successfully deleted share' })

  const shares = await getSharesService()

  if (shares) {
    return setShares(shares)
  }
  return setMessageState({ errorMessage: 'Something went wrong fetching shares' })
}

export const handleMouseLeave = (setTooltipMessage: Dispatch<SetStateAction<string>>, message: string) => {
  return () => {
    setTooltipMessage(message)
  }
}

export const handleCopyCode = (setTooltipMessage: Dispatch<SetStateAction<string>>) => {
  return () => {
    setTooltipMessage('Copied')
  }
}

export const handleGetDataSets = (
  setDataSets: Dispatch<SetStateAction<PagedApiResponse<DataSetModel> | undefined>>,
  setDataSetsLoading: Dispatch<SetStateAction<boolean>>,
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  currentSubscription: SubscriptionModel | null,
) => () => {
  const getDataSets = async () => {
    setDataSetsLoading(true)
    const dataSetsFetched = await getDataSetsService()
    setDataSetsLoading(false)
    if (dataSetsFetched) {
      return setDataSets(dataSetsFetched)
    }
    return setMessageState({ errorMessage: 'Something went wrong fetching data sets, please try again' })
  }
  if (currentSubscription) {
    getDataSets()
  }
}

export const handleGetShares = (
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>,
  setSharesLoading: Dispatch<SetStateAction<boolean>>,
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  currentSubscription: SubscriptionModel | null,
) => () => {
  const getShares = async () => {
    setSharesLoading(true)
    const sharesFetched = await getSharesService()
    setSharesLoading(false)
    if (sharesFetched) {
      return setShares(sharesFetched)
    }
    return setMessageState({ errorMessage: 'Something went wrong fetching data shares, please try again' })
  }
  if (currentSubscription) {
    getShares()
  }
}
