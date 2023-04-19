import React, { FC } from 'react'
import { Button, ButtonGroup, FlexContainer, Loader, Title, useMediaQuery, useModal } from '@reapit/elements'
import { useReapitGet } from '@reapit/use-reapit-data'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { CompanyForm } from './company-form'
import { Controls } from '../page/controls'

export const SettingsCompanyPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()

  const [developer, developerLoading, , refreshDeveloper] = useReapitGet<DeveloperModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDeveloper],
    uriParams: { developerId },
    fetchWhenTrue: [developerId],
  })

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>Company</Title>
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={openModal}>
              Controls
            </Button>
          </ButtonGroup>
        )}
      </FlexContainer>
      {isMobile && (
        <Modal title="Controls">
          <Controls />
          <ButtonGroup alignment="center">
            <Button fixedWidth intent="secondary" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      {developerLoading && <Loader />}
      {developer && <CompanyForm developer={developer} refreshDeveloper={refreshDeveloper} />}
    </>
  )
}

export default SettingsCompanyPage
