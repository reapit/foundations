import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { ContextMenuItem, ContextMenuItems, ContextMenuToggle, ContextMenuWrapper, isHidden } from './__styles_/styles'
import { Icon } from '@reapit/elements/v3'
import { cx } from 'linaria'
import { CancelConfirmModal } from '../cancel-confirm-modal'
import { ExtendedAppointmentModel } from '../../../types/global'

interface ContextMenuProps {
  appointment: ExtendedAppointmentModel
}

export const handleToggleMenu = (setMenuOpen: Dispatch<SetStateAction<boolean>>) => () => {
  setMenuOpen((currentState) => !currentState)
}

export const handleShowModal = (setShowModal: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setShowModal(true)
}

export const handleHideModal = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setMenuOpen: Dispatch<SetStateAction<boolean>>,
) => () => {
  setShowModal(false)
  setMenuOpen(false)
}

export const ContextMenu: FC<ContextMenuProps> = ({ appointment }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  if (appointment.cancelled) return null
  return (
    <>
      <ContextMenuWrapper>
        <ContextMenuToggle className={cx(menuOpen && isHidden)} onClick={handleToggleMenu(setMenuOpen)}>
          <Icon icon="more" fontSize="1.2rem" />
        </ContextMenuToggle>
        <ContextMenuItems className={cx(!menuOpen && isHidden)}>
          <ContextMenuItem className="mb-4" onClick={handleToggleMenu(setMenuOpen)}>
            <Icon icon="close" />
          </ContextMenuItem>
          <ContextMenuItem onClick={handleShowModal(setShowModal)}>
            <Icon icon="trash" intent="danger" />
          </ContextMenuItem>
        </ContextMenuItems>
      </ContextMenuWrapper>
      <CancelConfirmModal
        showModal={showModal}
        handleHideModal={handleHideModal(setShowModal, setMenuOpen)}
        appointment={appointment}
      />
    </>
  )
}
