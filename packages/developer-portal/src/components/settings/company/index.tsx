import React, { FC } from 'react'
import { Button, ButtonGroup, Loader, MobileControls, Title, useMediaQuery, useModal } from '@reapit/elements'
import { useReapitGet } from '@reapit/use-reapit-data'
import { Marketplace } from '@reapit/foundations-ts-definitions'
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

  const [developer, developerLoading, , refreshDeveloper] = useReapitGet<Marketplace.DeveloperModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDeveloper],
    uriParams: { developerId },
    fetchWhenTrue: [developerId],
  })

  return (
    <>
      <Title>Company</Title>
      {isMobile && (
        <Modal title="Controls">
          <Controls />
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      {developerLoading && <Loader />}
      {developer && <CompanyForm developer={developer} refreshDeveloper={refreshDeveloper} />}
      <MobileControls onClick={openModal} />
    </>
  )
}

export default SettingsCompanyPage
