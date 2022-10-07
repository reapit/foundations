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
import { SubscriptionModel } from '@reapit/foundations-ts-definitions'

export const handlePolling = (accountUri: string): Promise<{ provisioned: boolean; interval: number }> => {
  const accountId = accountUri.split('/').slice(-1)[0]

  return new Promise((resolve, reject) => {
    const interval = window.setInterval(async () => {
      const account = await getAccountService(accountId)

      if (account && account.status === 'User is active') {
        resolve({ provisioned: true, interval })
      }

      if (account && account.status === 'An error was encountered when creating this account') {
        resolve({ provisioned: false, interval })
      }

      reject()
    }, 4500)
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
    return setMessageState({ errorMessage: 'Something went wrong creating an account, please try again' })
  }

  const { provisioned, interval } = await handlePolling(accountUri)

  window.clearInterval(interval)

  if (!provisioned) {
    setPercentageComplete(0)
    setProvisionInProgress(false)
    return setMessageState({ errorMessage: 'Something went wrong creating an account, please try again' })
  }

  setPercentageComplete(100)
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

export const disableAccount =
  (
    setMessageState: Dispatch<React.SetStateAction<MessageState>>,
    setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>,
    setDisabling: Dispatch<React.SetStateAction<string>>,
    value: string,
  ) =>
  async () => {
    setDisabling(value)

    const disabled = await disableAccountsService(value)

    setDisabling('')

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

export const handleGetAccounts =
  (
    setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>,
    setAccountsLoading: Dispatch<SetStateAction<boolean>>,
    setMessageState: Dispatch<React.SetStateAction<MessageState>>,
    currentSubscription: SubscriptionModel | null,
  ) =>
  () => {
    const getAccounts = async () => {
      setAccountsLoading(true)
      const accounts = await getAccountsService()
      setAccountsLoading(false)
      if (accounts) {
        return setAccounts(accounts)
      }
      return setMessageState({ errorMessage: 'Something went wrong fetching accounts, please try again' })
    }
    if (currentSubscription) {
      getAccounts()
    }
  }
