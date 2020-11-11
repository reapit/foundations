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
import { PagedApiResponse } from '../../../types/core'
import { MessageContext } from '../../../context/message-context'
import { createAccount } from './account-handlers'

export interface AccountProvisionModalProps {
  visible: boolean
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>
  setProvisionInProgress: Dispatch<SetStateAction<boolean>>
  setPercentageComplete: Dispatch<SetStateAction<number>>
  handleClose: () => void
}

export const AccountProvisionForm: React.FC<Partial<AccountProvisionModalProps>> = ({ handleClose }) => (
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
)

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
        <AccountProvisionForm handleClose={handleClose} />
      </Formik>
    </Modal>
  )
}

export default AccountProvisionModal
