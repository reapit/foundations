import React, { Dispatch, SetStateAction, useContext } from 'react'
import {
  Button,
  ErrorData,
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
import { createAccountsService, getAccountsService } from '../../../services/accounts'
import { serverError } from '../../ui/toast-error'
import { PagedApiResponse } from '../../../types/core'
import { ErrorContext } from '../../../context/error-context'

export interface AccountProvisionModalProps {
  visible: boolean
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>
  setProvisionInProgress: Dispatch<SetStateAction<boolean>>
  setPercentageComplete: Dispatch<SetStateAction<number>>
  handleClose: () => void
}

export const createAccount = async (
  setServerErrorState: Dispatch<React.SetStateAction<ErrorData | null>>,
  setProvisionInProgress: Dispatch<SetStateAction<boolean>>,
  setPercentageComplete: Dispatch<SetStateAction<number>>,
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>,
  account: AccountCreateModel,
) => {
  const createdAccount = await createAccountsService(account)

  if (!createdAccount) {
    setProvisionInProgress(false)
    return setServerErrorState(serverError('Something went wrong disabling account, please try again'))
  }

  const accounts = await getAccountsService()

  setPercentageComplete(100)

  setTimeout(() => {
    setProvisionInProgress(false)
  }, 5000)

  if (accounts) {
    return setAccounts(accounts)
  }
  return setServerErrorState(serverError('Something went wrong fetching accounts, please try again'))
}

const AccountProvisionModal: React.FC<AccountProvisionModalProps> = ({
  visible,
  setAccounts,
  setProvisionInProgress,
  setPercentageComplete,
  handleClose,
}) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setServerErrorState } = useContext(ErrorContext)

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
          createAccount(setServerErrorState, setProvisionInProgress, setPercentageComplete, setAccounts, account)
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
