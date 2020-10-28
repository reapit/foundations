import React, { Dispatch, useContext } from 'react'
import { Button, Form, Formik, FormSection, FormSubHeading, Input, LevelRight, Modal } from '@reapit/elements'
import * as Yup from 'yup'
import { passwordRegex } from '@reapit/utils'
import { AccountCreateModel } from '../../../types/accounts'
import { updateAccountService } from '../../../services/accounts'
import { MessageContext, MessageState } from '../../../context/message-context'

export interface AccountUpdateModalProps {
  visible: boolean
  accountId: string | null
  handleClose: () => void
}

export const updateAccount = async (
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  account: Partial<AccountCreateModel>,
  accountId: string,
) => {
  const updatedAccount = await updateAccountService(account, accountId)

  if (!updatedAccount) {
    return setMessageState({
      message: 'Something went wrong updating password, please try again',
      variant: 'danger',
      visible: true,
    })
  }

  setMessageState({
    message: 'Successfully updated password',
    variant: 'info',
    visible: true,
  })
}

const AccountUpdateModal: React.FC<AccountUpdateModalProps> = ({ visible, accountId, handleClose }) => {
  const { setMessageState } = useContext(MessageContext)

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
            updateAccount(setMessageState, account, accountId)
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
