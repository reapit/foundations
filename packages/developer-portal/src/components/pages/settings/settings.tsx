import * as React from 'react'
import { Loader } from '@reapit/elements'
import { Forms } from './settings-profile-tab/forms'
import { Tabs } from './tabs'
import { useSelector } from 'react-redux'
import { selectCurrentMemberData, selectCurrentMemberIsLoading } from '@/selector/current-member'
import { Redirect } from 'react-router'
import Routes from '@/constants/routes'

export const RedirectToSettingsProfilePage = () => <Redirect to={Routes.SETTINGS_PROFILE_TAB} />

const SettingsPage: React.FC = () => {
  const currentUser = useSelector(selectCurrentMemberData)
  const loading = useSelector(selectCurrentMemberIsLoading)
  if (loading) {
    return <Loader />
  }
  return (
    <>
      <Tabs role={currentUser?.role} />
      <Forms />
    </>
  )
}

export default SettingsPage
