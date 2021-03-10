import React from 'react'
import { Story } from '@storybook/react/types-6-0'

import notification from './index'
import { Button } from '../Button'
import { Section } from '@/components/Layout'

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non sint voluptas qui amet architecto, ' +
  'maxime laudantium voluptatibus, laborum beatae explicabo minima voluptatum, doloremque blanditiis ' +
  'ipsum reiciendis quasi fugit eveniet perferendis!'

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
  </Section>
)
Default.args = {}
