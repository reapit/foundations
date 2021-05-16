import * as React from 'react'
import { H3, Button, Section } from '@reapit/elements'
import EnhanceContactInformation from './contact-information-form'
import ChangePasswordForm, { ChangePasswordValues } from './change-password-form'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { changePassword } from '@/actions/settings'
import { selectCurrentMemberIsLoading } from '@/selector/current-member'

import { reapitConnectBrowserSession } from '@/core/connect-session'
import ToggleCustomerDataForm from './toggle-customer-data-form'
import { Loader } from '@reapit/elements/v3'

export type CreateDispatchersReturn = {
  changePassword: (values: ChangePasswordValues) => void
  logout: () => void
}

export const createDispatchers = (dispatch: Dispatch): CreateDispatchersReturn => {
  return {
    changePassword: (values: ChangePasswordValues) => dispatch(changePassword(values)),
    logout: () => reapitConnectBrowserSession.connectLogoutRedirect(),
  }
}

export const Forms: React.FC = () => {
  const dispatch = useDispatch()

  const loading = useSelector(selectCurrentMemberIsLoading)

  const { changePassword, logout } = createDispatchers(dispatch)

  if (loading) {
    return <Loader label="Loading" fullPage />
  }

  return (
    <>
      <Section isFlex className="justify-between items-center" hasPadding={false}>
        <H3 className="mb-0">Settings</H3>
        <Button dataTest="logout-btn" variant="primary" type="button" onClick={logout}>
          Logout
        </Button>
      </Section>
      <EnhanceContactInformation />
      <ToggleCustomerDataForm />
      <ChangePasswordForm changePassword={changePassword} />
    </>
  )
}
