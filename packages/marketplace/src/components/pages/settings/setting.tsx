import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { H3, Button, LevelRight, FormHeading, FormSubHeading, Section } from '@reapit/elements'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { selectClientId } from '@/selector/auth'
import { selectUpdatePasswordLoading } from '@/selector/cognito-identity'
import { changePassword } from '@/actions/cognito-identity'
import ChangePasswordForm, { ChangePasswordValues } from './change-password-form'

export type CreateDispatchersReturn = {
  changePassword: (values: ChangePasswordValues) => void
  logout: () => void
}

export const createDispatchers = (
  dispatch: Dispatch,
  connectSession: ReapitConnectSession | null,
): CreateDispatchersReturn => {
  return {
    changePassword: (values: ChangePasswordValues) =>
      dispatch(
        changePassword({
          ...values,
          email: connectSession?.loginIdentity.email || '',
        }),
      ),
    logout: () => reapitConnectBrowserSession.connectLogoutRedirect(),
  }
}

export const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const customerId = selectClientId(connectSession)
  const { changePassword, logout } = createDispatchers(dispatch, connectSession)
  const loading = useSelector(selectUpdatePasswordLoading)

  return (
    <>
      <Section>
        <H3>Settings</H3>
      </Section>
      <Section>
        <FormHeading>
          Customer ID: <strong>{customerId}</strong>{' '}
        </FormHeading>
        <FormSubHeading>
          This is your Customer ID which you will need for use with Private Apps and Web Components.
        </FormSubHeading>
        <LevelRight className="bt pt-4">
          {!connectIsDesktop && (
            <Button dataTest="logout-btn" variant="primary" type="button" onClick={logout}>
              Logout
            </Button>
          )}
        </LevelRight>
      </Section>
      <ChangePasswordForm changePassword={changePassword} loading={loading} />
    </>
  )
}

export default Settings
