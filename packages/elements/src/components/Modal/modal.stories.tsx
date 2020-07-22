import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { Modal } from '.'
import { PortalProvider } from '../../hooks/UsePortal'
import { Button } from '../Button'
import { Section } from '@/components/Layout'

const stories = storiesOf('Modal', module)

const BasicUsage = ({ tapOutsideToDissmiss = true }) => {
  const [visible, setVisible] = useState(false)

  return (
    <PortalProvider>
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <Button variant="primary" type="button" onClick={() => setVisible(true)}>
          Open Modal
        </Button>
        <Modal
          tapOutsideToDissmiss={tapOutsideToDissmiss}
          visible={visible}
          afterClose={() => setVisible(false)}
          title="Modal Title"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas purus nec risus ornare convallis.
            Vivamus risus orci, efficitur quis nisl nec, porta sollicitudin ante. Nulla facilisi.
          </p>
        </Modal>
      </Section>
    </PortalProvider>
  )
}

const HasFooter = () => {
  const [visible, setVisible] = useState(false)

  return (
    <PortalProvider>
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <Button variant="primary" type="button" onClick={() => setVisible(true)}>
          Open Modal
        </Button>
        <Modal
          visible={visible}
          afterClose={() => setVisible(false)}
          title="Modal Title"
          footerItems={
            <Button variant="primary" type="button" onClick={() => setVisible(false)}>
              Close
            </Button>
          }
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas purus nec risus ornare convallis.
            Vivamus risus orci, efficitur quis nisl nec, porta sollicitudin ante. Nulla facilisi.
          </p>
        </Modal>
      </Section>
    </PortalProvider>
  )
}

const NestedModals = () => {
  const [modalOneVisible, setModalOneVisible] = useState(false)
  const [modalTwoVisible, setModalTwoVisible] = useState(false)

  return (
    <PortalProvider>
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <Button variant="primary" type="button" onClick={() => setModalOneVisible(true)}>
          Open Modal One
        </Button>
        <Modal visible={modalOneVisible} afterClose={() => setModalOneVisible(false)} title="Modal One Title">
          <>
            <Button variant="primary" type="button" onClick={() => setModalTwoVisible(true)}>
              Open Modal Two
            </Button>
            <Modal
              visible={modalTwoVisible}
              afterClose={() => setModalTwoVisible(false)}
              size="small"
              title="Modal Two Title"
            >
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  setModalOneVisible(false)
                  setModalTwoVisible(false)
                }}
              >
                Close Both Modals
              </Button>
            </Modal>
          </>
        </Modal>
      </Section>
    </PortalProvider>
  )
}

stories.add('Basic', () => <BasicUsage />)
stories.add('Disabled tapOutsideToDissmiss', () => <BasicUsage tapOutsideToDissmiss={false} />)
stories.add('HasFooter', () => <HasFooter />)
stories.add('Nested', () => <NestedModals />)
