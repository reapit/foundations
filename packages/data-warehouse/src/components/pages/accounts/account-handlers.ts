import React, { Dispatch, SetStateAction } from 'react'
import {
  createAccountsService,
  disableAccountsService,
  getAccountService,
  getAccountsService,
  updateAccountService,
} from '../../../services/accounts'
import { PagedApiResponse } from '../../../types/core'
import { MessageState } from '../../../context/message-context'
import { AccountCreateModel, AccountModel } from '../../../types/accounts'

export const handlePolling = (
  setPercentageComplete: Dispatch<SetStateAction<number>>,
  accountUri: string,
): Promise<void | number> => {
  const accountId = accountUri.split('/').slice(-1)[0]

  return new Promise(resolve => {
    const interval = window.setInterval(async () => {
      const account = await getAccountService(accountId)
      if (account && account.status === 'User is active') {
        setPercentageComplete(100)
        resolve(interval)
      }
    }, 3000)
  })
}

export const createAccount = async (
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  setProvisionInProgress: Dispatch<SetStateAction<boolean>>,
  setPercentageComplete: Dispatch<SetStateAction<number>>,
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>,
  account: AccountCreateModel,
) => {
  const accountUri = await createAccountsService(account)

  if (!accountUri) {
    setProvisionInProgress(false)
    return setMessageState({ errorMessage: 'Something went wrong creating account, please try again' })
  }

  const polling = await handlePolling(setPercentageComplete, accountUri)

  if (polling) {
    window.clearInterval(polling)
  }

  setMessageState({ infoMessage: 'Successfully provisioned account' })

  const accounts = await getAccountsService()

  setTimeout(() => {
    setPercentageComplete(0)
    setProvisionInProgress(false)
  }, 10000)

  if (accounts) {
    return setAccounts(accounts)
  }
  return setMessageState({ errorMessage: 'Something went wrong fetching accounts, please try again' })
}

export const updateAccount = async (
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  account: Partial<AccountCreateModel>,
  accountId: string,
) => {
  const updatedAccount = await updateAccountService(account, accountId)

  if (!updatedAccount) {
    return setMessageState({ errorMessage: 'Something went wrong updating password, please try again' })
  }

  setMessageState({ infoMessage: 'Successfully updated password' })
}

export const disableAccount = (
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>,
  setDisabling: Dispatch<React.SetStateAction<boolean>>,
  value: string,
) => async () => {
  setDisabling(true)

  const disabled = await disableAccountsService(value)

  setDisabling(false)

  if (!disabled) {
    return setMessageState({ errorMessage: 'Something went wrong deleting account, please try again' })
  }

  setMessageState({ infoMessage: 'Account successfully deleted' })

  const accounts = await getAccountsService()

  if (accounts) {
    return setAccounts(accounts)
  }

  return setMessageState({ errorMessage: 'Something went wrong fetching accounts, please try again' })
}
