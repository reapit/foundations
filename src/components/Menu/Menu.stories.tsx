import React from 'react'
import { storiesOf } from '@storybook/react'
import { Menu } from '.'
import { MemoryRouter } from 'react-router'
import { mockMenuProps } from './__mocks__/menu-props'
import { AppNavContainer } from '../Layout'

storiesOf('Menu', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('Primary', () => {
    return (
      <AppNavContainer>
        <Menu {...mockMenuProps} />
      </AppNavContainer>
    )
  })
