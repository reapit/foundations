import React from 'react'

import { storiesOf } from '@storybook/react'
import notification from './index'
import { Button } from '../Button'
import { Section } from '@/components/Layout'

const stories = storiesOf('Notification', module)

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non sint voluptas qui amet architecto, ' +
  'maxime laudantium voluptatibus, laborum beatae explicabo minima voluptatum, doloremque blanditiis ' +
  'ipsum reiciendis quasi fugit eveniet perferendis!'

stories.add('notification', () => {
  return (
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
})
