import React, { FC, useEffect } from 'react'
import { Title } from '@reapit/elements'
import { useParams } from 'react-router-dom'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'

export const AppInstallations: FC = () => {
  const { appId } = useParams<AppUriParams>()
  const { setAppId } = useAppState()

  useEffect(handleSetAppId(appId, setAppId), [appId])

  return (
    <>
      <Title>Installations</Title>
    </>
  )
}

export default AppInstallations
