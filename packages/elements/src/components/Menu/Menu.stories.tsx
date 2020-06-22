import React from 'react'
import { storiesOf } from '@storybook/react'
import { Menu } from '.'
import { MemoryRouter } from 'react-router'
import { mockMenuProps } from './__mocks__/menu-props'
import { AppNavContainer } from '../Layout'
import { GLOBAL_KEY } from '../DynamicLinks'

storiesOf('Menu', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('Primary', () => {
    return (
      <AppNavContainer>
        <Menu {...mockMenuProps} />
      </AppNavContainer>
    )
  })
  .add('Menu without mode', () => {
    window[GLOBAL_KEY] = {}
    return (
      <AppNavContainer>
        <Menu {...mockMenuProps} mode={undefined} />
        <div>
          When not passing <code>mode</code> props, the mode will be auto-detected based on{' '}
          <code>window.{GLOBAL_KEY}</code> variable
          <br />
          In this case, the detected mode is <code>DESKTOP</code> and the menu is hidden
        </div>
      </AppNavContainer>
    )
  })
