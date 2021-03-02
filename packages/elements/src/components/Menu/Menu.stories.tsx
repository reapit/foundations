import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Menu, MenuConfig } from '.'
import { MemoryRouter } from 'react-router'
import { mockMenuProps } from './__mocks__/menu-props'
import { AppNavContainer, Section } from '../Layout'
import { GLOBAL_KEY } from '../DynamicLinks'

export default {
  title: 'Rereshed-Docs/Menu',
  component: Menu,
}

export const Primary: Story<MenuConfig> = (args) => (
  <MemoryRouter initialEntries={['/']}>
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <AppNavContainer>
        <Menu {...args} />
      </AppNavContainer>
    </Section>
  </MemoryRouter>
)
Primary.args = mockMenuProps

export const MenuWithoutMode: Story<MenuConfig> = (args) => {
  window[GLOBAL_KEY] = {}
  return (
    <MemoryRouter initialEntries={['/']}>
      <AppNavContainer>
        <Menu {...args} />
        <div>
          When not passing <code>mode</code> props, the mode will be auto-detected based on{' '}
          <code>window.{GLOBAL_KEY}</code> variable
          <br />
          In this case, the detected mode is <code>DESKTOP</code> and the menu is hidden
        </div>
      </AppNavContainer>
    </MemoryRouter>
  )
}
MenuWithoutMode.args = {
  ...mockMenuProps,
  mode: undefined,
}
