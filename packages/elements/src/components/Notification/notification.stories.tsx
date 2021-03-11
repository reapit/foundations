import React from 'react'
import { Story } from '@storybook/react/types-6-0'

import notification from './index'
import { Button } from '../Button'
import { Section } from '@/components/Layout'

const longText = 'Some message to display to the user'

export default {
  title: 'Components/Notification',
  component: Notification,
}

export const Default: Story = () => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <Button variant="primary" type="button" onClick={() => notification.success({ message: longText })}>
      Success
    </Button>
    <Button variant="primary" type="button" onClick={() => notification.error({ message: longText })}>
      Error
    </Button>
    <Button variant="primary" type="button" onClick={() => notification.info({ message: longText })}>
      Info
    </Button>
  </Section>
)
Default.args = {}
