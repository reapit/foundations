/* istanbul ignore file */
/* Had to add because of skipped test, react hooks testing not yet supporting React 18 
https://github.com/testing-library/react-hooks-testing-library/issues/654 can remove when tests un-skipped
Looks like we will have to migrate to the main testing lib when this PR is merged
https://github.com/testing-library/react-testing-library/pull/991*/
import React, { FC, useMemo, useState } from 'react'
import { Modal, ModalProps } from '../../components/modal'
import { Portal } from '../use-portal'

export interface UseModal {
  Modal: FC<Partial<ModalProps>>
  closeModal: () => void
  openModal: () => void
  modalIsOpen: boolean
}

export const useModal = (id?: string): UseModal => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const portalId = id ?? 'root'
  const closeModal = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)

  const ModalComponent: FC<Partial<ModalProps>> = ({
    children,
    isOpen = modalIsOpen,
    onModalClose = closeModal,
    ...rest
  }) => (
    <Portal id={portalId}>
      <Modal isOpen={isOpen} onModalClose={onModalClose} {...rest}>
        {children}
      </Modal>
    </Portal>
  )

  return useMemo(() => ({ Modal: ModalComponent, closeModal, openModal, modalIsOpen }), [modalIsOpen])
}
