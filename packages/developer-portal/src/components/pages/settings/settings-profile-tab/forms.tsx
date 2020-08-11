import * as React from 'react'
import { H3, Button, Loader, Section } from '@reapit/elements'
import EnhanceContactInformation, { ContactInformationValues } from './contact-information-form'
import ChangePasswordForm, { ChangePasswordValues } from './change-password-form'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { updateDeveloperData, changePassword } from '@/actions/settings'
import { selectOrganisationMembers, selectOrganisationMembersLoading } from '@/selector/developers'
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

export const Forms: React.FC = () => {
  const dispatch = useDispatch()

  // need to fetch both /developers/:id & /developer/:id/member to get full info
  // to render form
  const loadingDeveloperInfo = useSelector(selectSettingsPageIsLoading)
  const developerInfo = useSelector(selectSettingsPageDeveloperInformation)

  const loadingOrgMembers = useSelector(selectOrganisationMembersLoading)
  const orgMembersList = useSelector(selectOrganisationMembers)
  // query by email -> select the first member
  const [currentDeveloperMemberInfo] = orgMembersList

  const loading = loadingDeveloperInfo || loadingOrgMembers

  const developerFullInfo = { ...developerInfo, ...currentDeveloperMemberInfo }

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
          developerInformation={developerFullInfo}
          updateDeveloperInformation={updateDeveloperInformation}
        />
        <ChangePasswordForm changePassword={changePassword} />
      </Section>
    </>
  )
}
