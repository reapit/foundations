import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Modal, ModalProps } from '.'
import { PortalProvider } from '../../hooks/UsePortal'
import { Button } from '../Button'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Modal',
  component: Modal,
}

export const Open: Story<ModalProps> = (args) => (
  <PortalProvider>
    <Modal {...args}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas purus nec risus ornare convallis.
        Vivamus risus orci, efficitur quis nisl nec, porta sollicitudin ante. Nulla facilisi.
      </p>
    </Modal>
  </PortalProvider>
)
Open.args = {
  tapOutsideToDissmiss: true,
  visible: true,
  setSubscribingState: action(
    'The user requested that the modal closed. Your application will now need to toggle the visible prop',
  ),
  title: 'Modal Title',
}

export const OpenWithFooter: Story<ModalProps> = (args) => (
  <PortalProvider>
    <Modal {...args}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas purus nec risus ornare convallis.
        Vivamus risus orci, efficitur quis nisl nec, porta sollicitudin ante. Nulla facilisi.
      </p>
    </Modal>
  </PortalProvider>
)
OpenWithFooter.args = {
  tapOutsideToDissmiss: true,
  visible: true,
  setSubscribingState: action(
    'The user requested that the modal closed. Your application will now need to toggle the visible prop',
  ),
  title: 'Modal Title',
  footerItems: (
    <Button
      variant="primary"
      type="button"
      onClick={action(
        'The user requested that the modal closed. Your application will now need to toggle the visible prop',
      )}
    >
      Close
    </Button>
  ),
}
