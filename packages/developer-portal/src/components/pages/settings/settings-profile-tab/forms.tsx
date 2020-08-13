import * as React from 'react'
import { H3, Button, Loader, Section } from '@reapit/elements'
import EnhanceContactInformation from './contact-information-form'
import ChangePasswordForm, { ChangePasswordValues } from './change-password-form'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { changePassword } from '@/actions/settings'
import { selectCurrentMemberIsLoading } from '@/selector/current-member'

import { reapitConnectBrowserSession } from '@/core/connect-session'

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
    return <Loader />
  }

  return (
    <>
      <Section isFlex className="justify-between items-center">
        <H3 className="mb-0">Settings</H3>
        <Button dataTest="logout-btn" variant="primary" type="button" onClick={logout}>
          Logout
        </Button>
      </Section>
      <Section hasPadding={false} hasBackground={false}>
        <EnhanceContactInformation />
        <ChangePasswordForm changePassword={changePassword} />
      </Section>
    </>
  )
}
