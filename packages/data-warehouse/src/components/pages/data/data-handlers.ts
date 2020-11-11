import { SetStateAction, Dispatch } from 'react'
import { MessageState } from '../../../context/message-context'
import { createRequestService } from '../../../services/requests'
import { deleteSharesService, getSharesService } from '../../../services/shares'
import { PagedApiResponse } from '../../../types/core'
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
