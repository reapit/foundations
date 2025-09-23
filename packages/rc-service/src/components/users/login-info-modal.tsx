import { useModal, Button, Modal, PersistentNotification, Loader, ButtonGroup } from '@reapit/elements'
import { useReapitGet, getActions, GetActionNames } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { UserInfoModel } from '@reapit/foundations-ts-definitions'
import { DisplayChip } from './__styles__'

export const LoginInfoModal: FC<{ email?: string }> = ({ email }) => {
  const { modalIsOpen, openModal, closeModal } = useModal()

  const [userInfo, userInfoLoading] = useReapitGet<UserInfoModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserInfo],
    queryParams: { email: encodeURIComponent(email ?? ''), includeIdpData: true },
    fetchWhenTrue: [email, modalIsOpen],
  })

  return (
    <>
      <Button intent="neutral" onClick={openModal}>
        View
      </Button>
      <Modal
        title="Login Info"
        isOpen={modalIsOpen}
        onModalClose={() => {
          closeModal()
        }}
      >
        {userInfo && !userInfoLoading && userInfo.idpData?.authEvents?.length
          ? userInfo.idpData?.authEvents.slice(0, 5).map((event) => <DisplayChip key={event}>{event}</DisplayChip>)
          : (modalIsOpen && !userInfoLoading && (
              <PersistentNotification isFullWidth isExpanded isInline intent="primary">
                No login events available for this user.
              </PersistentNotification>
            )) ||
            null}
        {userInfoLoading && modalIsOpen ? <Loader /> : null}
        <ButtonGroup alignment="center">
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
