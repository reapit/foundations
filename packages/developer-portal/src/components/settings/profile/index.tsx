import React, { FC } from 'react'
import { Loader, Title } from '@reapit/elements'
import { useGlobalState } from '../../../core/use-global-state'
import { ProfileForm } from './profile-form'

export const SettingsProfilePage: FC = () => {
  const { globalDataState } = useGlobalState()
  const { currentMember } = globalDataState

  return (
    <>
      <Title>Profile</Title>
      {!currentMember ? <Loader /> : <ProfileForm />}
    </>
  )
}

export default SettingsProfilePage
