import React, { FC } from 'react'
import { AppDetailModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Button, ButtonGroup, SmallText } from '@reapit/elements'

export const DESKTOP_REFRESH_URL = 'agencycloud://apps/refresh'

export type AppInstallModalContentProps = {
  app?: AppDetailModel
  closeModal: () => void
  developer: DeveloperModel
}

export const AppInstallSuccesModalContent: FC<AppInstallModalContentProps> = ({ app, closeModal, developer }) => {
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const { name, id, isDirectApi, launchUri, telephone, supportEmail } = app ?? {}
  const { name: developerName } = developer

  return (
    <>
      {isDirectApi ? (
        <>
          <SmallText hasGreyText>{name} integration has been successfully enabled.</SmallText>
          <SmallText hasGreyText>
            For details on how to use the integration and, if there are any additional setup requirements, a member of{' '}
            {developerName} will be in touch to help you through the process.
          </SmallText>
          <SmallText hasGreyText>
            If you wish to contact them directly, you can do this via telephone at {telephone} or email at{' '}
            <a href={`mailto:${supportEmail}`} rel="noopener noreferrer" target="_blank">
              {supportEmail}
            </a>
            .
          </SmallText>
        </>
      ) : (
        <>
          <SmallText>
            The {name} app has been successfully installed. You can now launch the app from the &lsquo;My Apps&rsquo;
            page or by clicking the button below.
          </SmallText>
          <SmallText>
            If you wish to contact the developer about using the app, you can do this via telephone at {telephone} or
            email at{' '}
            <a href={`mailto:${supportEmail}`} rel="noopener noreferrer" target="_blank">
              {supportEmail}
            </a>
            .
          </SmallText>
        </>
      )}
      <ButtonGroup alignment="center">
        <Button intent="low" onClick={closeModal} fixedWidth>
          Back To App
        </Button>
        {!isDirectApi && (
          <>
            {connectIsDesktop ? (
              <a href={`agencycloud://app?id=${id}&launchUri=${launchUri}`}>
                <Button intent="primary" type="button">
                  Launch App
                </Button>
              </a>
            ) : (
              <a href={launchUri} target="_blank" rel="noopener noreferrer">
                <Button intent="primary" type="button">
                  Launch App
                </Button>
              </a>
            )}
          </>
        )}
      </ButtonGroup>
    </>
  )
}
