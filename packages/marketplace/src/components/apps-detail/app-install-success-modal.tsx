import React, { FC, useCallback } from 'react'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { Button, ButtonGroup, BodyText } from '@reapit/elements'
import { AcProcessType, DesktopLink } from '@reapit/utils-react'
import { TrackingEvent } from '../../core/analytics-events'
import { trackEvent, trackEventHandler } from '../../core/analytics'

export const DESKTOP_REFRESH_URL = 'agencycloud://apps/refresh'

export type AppInstallModalContentProps = {
  app?: AppDetailModel
  closeModal: () => void
  developer?: string
}

export const handleCloseModal = (closeModal: () => void, appName?: string) => () => {
  trackEvent(TrackingEvent.ClickBackToAppAfterInstall, true, { appName })

  closeModal()
}

export const AppInstallSuccesModalContent: FC<AppInstallModalContentProps> = ({ app, closeModal, developer }) => {
  const { name, id, isDirectApi, launchUri, telephone, supportEmail } = app ?? {}

  const trackSendSupportEmail = useCallback(trackEventHandler(TrackingEvent.ClickSendSupportEmail, true), [])
  const trackLaunchAppPostInstall = useCallback(trackEventHandler(TrackingEvent.ClickLaunchAppPostInstall, true), [])
  const handleClose = useCallback(handleCloseModal(closeModal, name), [app])

  return (
    <>
      {isDirectApi ? (
        <>
          <BodyText hasGreyText>{name} integration has been successfully enabled.</BodyText>
          <BodyText hasGreyText>
            For details on how to use the integration and, if there are any additional setup requirements, a member of{' '}
            {developer} will be in touch to help you through the process.
          </BodyText>
          <BodyText hasGreyText>
            If you wish to contact them directly, you can do this via telephone at {telephone} or email at{' '}
            <DesktopLink
              onClick={trackSendSupportEmail}
              uri={supportEmail}
              acProcess={AcProcessType.mail}
              target="_blank"
              content={supportEmail}
            />
            .
          </BodyText>
        </>
      ) : (
        <>
          <BodyText>
            The {name} app has been successfully installed. You can now launch the app from the &lsquo;My Apps&rsquo;
            page or by clicking the button below.
          </BodyText>
          <BodyText>
            If you wish to contact the developer about using the app, you can do this via telephone at {telephone} or
            email at{' '}
            <DesktopLink
              onClick={trackSendSupportEmail}
              uri={supportEmail}
              acProcess={AcProcessType.mail}
              target="_blank"
              content={supportEmail}
            />
            .
          </BodyText>
        </>
      )}
      <ButtonGroup alignment="center">
        <Button intent="low" onClick={handleClose} fixedWidth>
          Back To App
        </Button>
        {!isDirectApi && launchUri && (
          <>
            <DesktopLink
              onClick={trackLaunchAppPostInstall}
              uri={launchUri}
              acProcess={AcProcessType.app}
              acId={id}
              target="_blank"
              content={
                <Button intent="primary" type="button">
                  Launch App
                </Button>
              }
            />
          </>
        )}
      </ButtonGroup>
    </>
  )
}
