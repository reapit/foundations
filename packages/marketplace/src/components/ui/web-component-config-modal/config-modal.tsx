import * as React from 'react'
import { Modal } from '@reapit/elements'
import { WebComponentConfigModalInner } from './config-modal-inner'

export const BOOK_VIEWING_CONSTANT = {
  title: 'Book a Viewing Configuration',
  subtext:
    'Please use the following form to configure your diary settings for your ‘Book a Viewing’ widget on your website',
}

export const BOOK_VALUATION_CONSTANT = {
  title: 'Book a Valuation Configuration',
  subtext:
    'Please use the following form to configure your diary settings for your ‘Book a Valuation’ widget on your website',
}

export type WebComponentModalProps = {
  type: 'BOOK_VIEWING' | 'BOOK_VALUATION'
  afterClose: () => void
  closeModal: () => void
}

export const WebComponentModal = ({ type, afterClose, closeModal }: WebComponentModalProps) => {
  const config = type === 'BOOK_VIEWING' ? BOOK_VIEWING_CONSTANT : BOOK_VALUATION_CONSTANT

  return (
    <Modal visible renderChildren afterClose={afterClose}>
      <WebComponentConfigModalInner config={config} closeModal={closeModal} />
    </Modal>
  )
}
export default WebComponentModal
