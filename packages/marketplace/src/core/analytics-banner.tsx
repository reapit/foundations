import React, { Dispatch, FC, MouseEvent, SetStateAction, useCallback, useEffect, useState } from 'react'
import { reapitConnectBrowserSession } from './connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { getRoleFromGroups } from './analytics'
import mixpanel from 'mixpanel-browser'
import { PersistentNotification } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import { UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { UserModel, UpdateUserModel } from '@reapit/foundations-ts-definitions'
import { cookieBannerPosition } from './__styles__'
import { useAppsBrowseState } from './use-apps-browse-state'
import { useLocation } from 'react-router'
import { RoutePaths } from '../constants/routes'

export const handleSetUserConsent =
  (
    currentUserState: UserModel | null,
    connectSession: ReapitConnectSession | null,
    setTrackingBannerVisible: Dispatch<SetStateAction<boolean>>,
  ) =>
  () => {
    const isLocal = process.env.appEnv !== 'production'
    if (!currentUserState || !connectSession) return

    if (currentUserState.consentToTrack) {
      const { email, name, clientId, userCode, orgName, groups, developerId } = connectSession?.loginIdentity ?? {}
      const userRoles = getRoleFromGroups(groups)

      if (!isLocal) {
        mixpanel.opt_in_tracking()
        mixpanel.identify(email)
        mixpanel.people.set({
          $name: name,
          $email: email,
          'User Neg Code': userCode,
          'Organisation Name': orgName,
          'Organisation Client Code': clientId,
          'Developer Id': developerId,
          'User Roles': userRoles,
        })
      }
      setTrackingBannerVisible(true)
    } else {
      mixpanel.opt_out_tracking()
    }
  }

export const handleSetDoNotTrack =
  (
    setTrackingBannerVisible: Dispatch<SetStateAction<boolean>>,
    updateUser: SendFunction<UpdateUserModel, boolean>,
    currentUserState: UserModel | null,
    refreshCurrentUser: () => void,
  ) =>
  async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()

    mixpanel.opt_out_tracking()
    setTrackingBannerVisible(false)

    if (currentUserState) {
      const userUpdate = await updateUser({
        ...currentUserState,
        name: currentUserState.name ?? '',
        consentToTrack: false,
      })

      if (userUpdate) refreshCurrentUser()
    }
  }

export const handleTrackingBannerTimeout =
  (setTrackingBannerVisible: Dispatch<SetStateAction<boolean>>, trackingBannerVisible: boolean) => () => {
    if (trackingBannerVisible) {
      const timeout = setTimeout(() => {
        setTrackingBannerVisible(false)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }

export const handleTrackingBannerClick =
  (setTrackingBannerVisible: Dispatch<SetStateAction<boolean>>, trackingBannerVisible: boolean) => () => {
    setTrackingBannerVisible(!trackingBannerVisible)
  }

export const AnalyticsBanner: FC = () => {
  const { pathname } = useLocation()
  const { currentUserState, refreshCurrentUser } = useAppsBrowseState()
  const [trackingBannerVisible, setTrackingBannerVisible] = useState(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const email = connectSession?.loginIdentity.email
  const userId = email ? window.btoa(email.toLowerCase()).replace(/=/g, '') : null

  const [, , updateUser] = useReapitUpdate<UpdateUserModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateUser],
    method: 'PUT',
    uriParams: {
      userId,
    },
  })

  useEffect(handleSetUserConsent(currentUserState, connectSession, setTrackingBannerVisible), [
    currentUserState,
    connectSession,
  ])

  useEffect(handleTrackingBannerTimeout(setTrackingBannerVisible, trackingBannerVisible), [trackingBannerVisible])

  const doNotTrack = useCallback(
    handleSetDoNotTrack(setTrackingBannerVisible, updateUser, currentUserState, refreshCurrentUser),
    [currentUserState, trackingBannerVisible],
  )

  const trackingBannerClick = useCallback(handleTrackingBannerClick(setTrackingBannerVisible, trackingBannerVisible), [
    trackingBannerVisible,
  ])

  return currentUserState && currentUserState.consentToTrack && pathname !== RoutePaths.SETTINGS_PROFILE ? (
    <PersistentNotification
      onClick={trackingBannerClick}
      className={cookieBannerPosition}
      isExpanded={trackingBannerVisible}
      intent="primary"
    >
      The AppMarket uses mechanisms to track your use of the environment to provide an enhanced user experience and
      provide feedback to enable Reapit to improve the product - to opt out of this tracking{' '}
      <a onClick={doNotTrack}>click here</a>, if you do not opt out you can at a later date.
    </PersistentNotification>
  ) : null
}
