import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { ToastMessage, ToastVariant } from '.'
import { Button } from '../Button'

const stories = storiesOf('ToastMessage', module)

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non sint voluptas qui amet architecto, maxime laudantium voluptatibus, laborum beatae explicabo minima voluptatum, doloremque blanditiis ipsum reiciendis quasi fugit eveniet perferendis!'

const Usage = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [variant, setVariant] = useState<ToastVariant>('primary')

  const closeToast = () => {
    setVisible(false)
  }

  return (
    <section className="section">
      <Button
        variant="primary"
        type="button"
        onClick={() => {
          setVariant('primary')
          setVisible(true)
        }}
      >
        Primary
      </Button>
      <br />
      <br />
      <Button
        variant="primary"
        type="button"
        onClick={() => {
          setVariant('secondary')
          setVisible(true)
        }}
      >
        Secondary
      </Button>
      <br />
      <br />
      <Button
        variant="primary"
        type="button"
        onClick={() => {
          setVariant('danger')
          setVisible(true)
        }}
      >
        Danger
      </Button>
      <br />
      <br />
      <Button
        variant="primary"
        type="button"
        onClick={() => {
          setVariant('info')
          setVisible(true)
        }}
      >
        Info
      </Button>
      <ToastMessage visible={visible} message={longText} variant={variant} onCloseToast={closeToast} />
    </section>
  )
}

stories.add('Default', () => <Usage />)
