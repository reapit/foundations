import React, { Dispatch, useContext } from 'react'
import {
  Button,
  ErrorData,
  Form,
  Formik,
  FormSection,
  FormSubHeading,
  Input,
  LevelRight,
  Modal,
} from '@reapit/elements'
import * as Yup from 'yup'
import { passwordRegex } from '@reapit/utils'
import { AccountCreateModel } from '../../../types/accounts'
import { updateAccountService } from '../../../services/accounts'
import { serverError } from '../../ui/toast-error'
import { ErrorContext } from '../../../context/error-context'

export interface AccountUpdateModalProps {
  visible: boolean
  accountId: string | null
  handleClose: () => void
}

export const updateAccount = async (
  setServerErrorState: Dispatch<React.SetStateAction<ErrorData | null>>,
  account: Partial<AccountCreateModel>,
  accountId: string,
) => {
  const updatedAccount = await updateAccountService(account, accountId)

  if (!updatedAccount) {
    return setServerErrorState(serverError('Something went wrong updating account, please try again'))
  }
}

const AccountUpdateModal: React.FC<AccountUpdateModalProps> = ({ visible, accountId, handleClose }) => {
  const { setServerErrorState } = useContext(ErrorContext)

  return (
    <Modal visible={visible} title="Data Warehouse Password Update" afterClose={handleClose}>
      <Formik
        initialValues={
          {
            password: '',
          } as Partial<AccountCreateModel>
        }
        onSubmit={(account: Partial<AccountCreateModel>) => {
          if (accountId) {
            updateAccount(setServerErrorState, account, accountId)
          }
          handleClose()
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .required('Required')
            .matches(passwordRegex, 'Password must be at least 8 characters, 1 number, mixed case'),
        })}
      >
        {() => (
          <Form className="form">
            <FormSection>
              <FormSubHeading>Enter new password below</FormSubHeading>
              <Input id="password" type="password" placeholder="*********" name="password" labelText="Password" />
              <LevelRight>
                <Button variant="secondary" type="button" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </LevelRight>
            </FormSection>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AccountUpdateModal
