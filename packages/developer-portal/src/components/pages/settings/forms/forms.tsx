import * as React from 'react'
import { H3, Button, Loader, Section } from '@reapit/elements'
import EnhanceContactInformation, { ContactInformationValues } from './contact-information-form'
import ChangePasswordForm, { ChangePasswordValues } from './change-password-form'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { updateDeveloperData, changePassword } from '@/actions/settings'
import { selectSettingsPageIsLoading, selectSettingsPageDeveloperInformation } from '@/selector/settings'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type CreateDispatchersReturn = {
  updateDeveloperInformation: (values: ContactInformationValues) => void
  changePassword: (values: ChangePasswordValues) => void
  logout: () => void
}

export const createDispatchers = (dispatch: Dispatch): CreateDispatchersReturn => {
  return {
    updateDeveloperInformation: (values: ContactInformationValues) => dispatch(updateDeveloperData(values)),
    changePassword: (values: ChangePasswordValues) => dispatch(changePassword(values)),
    logout: () => reapitConnectBrowserSession.connectLogoutRedirect(),
  }
}

export type SelectorReturn = {
  developerInfo: DeveloperModel | null
  email: string
  loading: boolean
}

export const Forms: React.FC = () => {
  const dispatch = useDispatch()

  const loading = useSelector(selectSettingsPageIsLoading)
  const developerInfo = useSelector(selectSettingsPageDeveloperInformation)

  const { changePassword, logout, updateDeveloperInformation } = createDispatchers(dispatch)

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
        <EnhanceContactInformation
          developerInformation={developerInfo}
          updateDeveloperInformation={updateDeveloperInformation}
        />
        <ChangePasswordForm changePassword={changePassword} />
      </Section>
    </>
  )
}
