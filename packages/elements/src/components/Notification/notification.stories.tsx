import React from 'react'

import { storiesOf } from '@storybook/react'
import NotificationApi, { NotificationPlacement } from '.'
import { Button } from '../Button'

const stories = storiesOf('Notification', module)

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non sint voluptas qui amet architecto, ' +
  'maxime laudantium voluptatibus, laborum beatae explicabo minima voluptatum, doloremque blanditiis ' +
  'ipsum reiciendis quasi fugit eveniet perferendis!'

type FunctionName = 'open' | 'success' | 'error' | 'info' | 'warn'

const showNotification = (fnName: FunctionName = 'open', placement: NotificationPlacement = 'bottomRight') => {
  const fn = NotificationApi[fnName]
  fn({
    message: longText,
    onClick: () => {
      console.log('Notification Clicked!')
    },
    placement,
  })
}

const Apis = () => {
  return (
    <section className="section">
      <Button variant="primary" type="button" onClick={() => showNotification('open')}>
        Open
      </Button>
      <Button variant="primary" type="button" onClick={() => showNotification('success')}>
        Success
      </Button>
      <Button variant="primary" type="button" onClick={() => showNotification('error')}>
        Error
      </Button>
      <Button variant="primary" type="button" onClick={() => showNotification('info')}>
        Info
      </Button>
      <Button variant="primary" type="button" onClick={() => showNotification('warn')}>
        Warm
      </Button>
    </section>
  )
}

const Placement = () => {
  return (
    <section className="section">
      <Button variant="primary" type="button" onClick={() => showNotification('open', 'topLeft')}>
        Top-Left
      </Button>
      <Button variant="primary" type="button" onClick={() => showNotification('open', 'topRight')}>
        Top-Right
      </Button>
      <Button variant="primary" type="button" onClick={() => showNotification('open', 'bottomLeft')}>
        Bottom-Left
      </Button>
      <Button variant="primary" type="button" onClick={() => showNotification('open', 'bottomRight')}>
        Bottom-Right
      </Button>
    </section>
  )
}

const Context = React.createContext({ name: 'Default' })

const Hooks = () => {
  const [instance, contextHolder] = NotificationApi.useNotification()

  const openNotification = placement => {
    instance.info({
      message: <Context.Consumer>{({ name }) => `Hello, ${name}! - ${placement}`}</Context.Consumer>,
      placement,
    })
  }

  return (
    <section className="section">
      <Context.Provider value={{ name: 'Ant Design' }}>
        {contextHolder}
        <Button type="button" variant="primary" onClick={() => openNotification('topLeft')}>
          topLeft
        </Button>
        <Button type="button" variant="primary" onClick={() => openNotification('topRight')}>
          topRight
        </Button>
        <Button type="button" variant="primary" onClick={() => openNotification('bottomLeft')}>
          bottomLeft
        </Button>
        <Button type="button" variant="primary" onClick={() => openNotification('bottomRight')}>
          bottomRight
        </Button>
      </Context.Provider>
    </section>
  )
}

stories.add('Api', () => <Apis />)
stories.add('Placement', () => <Placement />)
stories.add('Hooks', () => <Hooks />)
