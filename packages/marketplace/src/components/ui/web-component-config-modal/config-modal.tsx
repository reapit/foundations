import * as React from 'react'
import { Modal } from '@reapit/elements'
import { WebComponentConfigModalInner } from './config-modal-inner'

export type WebComponentModalProps = {
  type: 'BOOK_VIEWING' | 'BOOK_VALUATION'
  afterClose: () => void
  closeModal: () => void
}

export type WebComponentType = {
  title: string
  subtext: string
}

export const WEB_COMPONENT_TYPES = {
  BOOK_VALUATION: {
    title: 'Book a Valuation Configuration',
    subtext: `Please use the following form to configure your diary settings for your 
    ‘Book a Valuation’ widget on your website`,
  },
  BOOK_VIEWING: {
    title: 'Book a Viewing Configuration',
    subtext: `Please use the following form to configure your diary settings for your
     ‘Book a Viewing’ widget on your website`,
  },
}

export const WebComponentModal = ({ type, afterClose, closeModal }: WebComponentModalProps) => {
  return (
    <Modal visible renderChildren afterClose={afterClose}>
      <WebComponentConfigModalInner config={WEB_COMPONENT_TYPES[type]} closeModal={closeModal} />
    </Modal>
  )
}
export default WebComponentModal
