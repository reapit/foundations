import React, { ReactNode, useState } from 'react'
import { Modal } from '../../components/modal'

interface IUseModal {
  Modal: ReactNode
  closeModal: () => void
  openModal: () => void
}

export default (): IUseModal => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)

  const ModalComponent = ({ children, ...rest }) => (
    <Modal isOpen={modalIsOpen} onModalClose={closeModal} {...rest}>
      {children}
    </Modal>
  )

  return { Modal: ModalComponent, closeModal, openModal }
}
