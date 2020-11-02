import React, { Dispatch, SetStateAction, useContext } from 'react'
import {
  Button,
  Form,
  FormHeading,
  Formik,
  FormSection,
  FormSubHeading,
  Input,
  LevelRight,
  Modal,
} from '@reapit/elements'
import * as Yup from 'yup'
import { passwordRegex } from '@reapit/utils'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { AccountCreateModel, AccountModel } from '../../../types/accounts'
import { createAccountsService, getAccountService, getAccountsService } from '../../../services/accounts'
import { PagedApiResponse } from '../../../types/core'
import { MessageContext, MessageState } from '../../../context/message-context'

export interface AccountProvisionModalProps {
  visible: boolean
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>
  setProvisionInProgress: Dispatch<SetStateAction<boolean>>
  setPercentageComplete: Dispatch<SetStateAction<number>>
  handleClose: () => void
}

export const handlePolling = async (setPercentageComplete: Dispatch<SetStateAction<number>>, accountUri: string) => {
  const accountId = accountUri.split('/').slice(-1)[0]

  setInterval(async () => {
    const account = await getAccountService(accountId)
    if (account) {
      console.log(account.status)
      // Creating new warehouse organisation
    }
  }, 5000)
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
    return setMessageState({
      message: 'Something went wrong creating account, please try again',
      variant: 'danger',
      visible: true,
    })
  }

  await handlePolling(setPercentageComplete, accountUri)

  setMessageState({
    message: 'Successfully provisioned account',
    variant: 'info',
    visible: true,
  })

  const accounts = await getAccountsService()

  setPercentageComplete(100)

  setTimeout(() => {
    setProvisionInProgress(false)
  }, 10000)

  if (accounts) {
    return setAccounts(accounts)
  }
  return setMessageState({
    message: 'Something went wrong fetching accounts, please try again',
    variant: 'danger',
    visible: true,
  })
}

const AccountProvisionModal: React.FC<AccountProvisionModalProps> = ({
  visible,
  setAccounts,
  setProvisionInProgress,
  setPercentageComplete,
  handleClose,
}) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setMessageState } = useContext(MessageContext)

  return (
    <Modal visible={visible} title="Provision Data Warehouse Account" afterClose={handleClose}>
      <Formik
        initialValues={
          {
            username: '',
            password: '',
            isAdmin: false,
            devMode: false,
            organisationId: connectSession?.loginIdentity.orgId,
            organisationName: connectSession?.loginIdentity.orgName,
          } as AccountCreateModel
        }
        onSubmit={(account: AccountCreateModel) => {
          createAccount(setMessageState, setProvisionInProgress, setPercentageComplete, setAccounts, account)
          setProvisionInProgress(true)
          handleClose()
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Required')
            .matches(/^[A-Za-z1-9]{4,20}$/, 'Mixed case alphanumeric characters only. Min 4 chars. Max 20'),
          password: Yup.string()
            .required('Required')
            .matches(passwordRegex, 'Password must be at least 8 characters, 1 number, mixed case'),
        })}
      >
        {() => (
          <Form className="form">
            <FormSection>
              <FormHeading>Account details</FormHeading>
              <FormSubHeading>The information below will be used to access your data warehouse account</FormSubHeading>
              <Input id="username" type="text" placeholder="Your username here" name="username" labelText="Username" />
              <Input id="password" type="password" placeholder="*********" name="password" labelText="Password" />
              <LevelRight>
                <Button variant="secondary" type="button" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Provision
                </Button>
              </LevelRight>
            </FormSection>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AccountProvisionModal
