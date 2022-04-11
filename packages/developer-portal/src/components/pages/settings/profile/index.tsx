import React, { FC } from 'react'
import { Loader, Title } from '@reapit/elements'
import { useSettingsState } from '../state/use-settings-state'
import { ProfileForm } from './profile-form'

export const SettingsProfilePage: FC = () => {
  const { settingsDataState } = useSettingsState()
  const { currentMember } = settingsDataState

  return (
    <>
      <Title>Profile</Title>
      {!currentMember ? <Loader /> : <ProfileForm />}
    </>
  )
}

export default SettingsProfilePage
