import React, { MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { clickNavEventHandler, handleToggleLogo, NavResponsive } from '../nav-responsive'
import { NavStateProvider } from '../../../hooks/use-nav-state'
import { MediaStateProvider } from '../../../hooks/use-media-query'

describe('NavResponsive component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <NavStateProvider>
        <MediaStateProvider>
          <NavResponsive
            defaultNavIndex={1}
            options={[
              {
                itemIndex: 0,
                callback: () => console.log('Navigating'),
              },
              {
                itemIndex: 1,
                callback: () => console.log('Navigating'),
                iconId: 'appsMenu',
                text: 'Apps',
                subItems: [
                  {
                    itemIndex: 0,
                    callback: () => console.log('Navigating'),
                    text: 'App List',
                  },
                  {
                    itemIndex: 1,
                    callback: () => console.log('Navigating'),
                    text: 'Create App',
                  },
                ],
              },
              {
                itemIndex: 2,
                callback: () => console.log('Navigating'),
                iconId: 'analyticsMenu',
                text: 'Analytics',
                subItems: [
                  {
                    itemIndex: 2,
                    callback: () => console.log('Navigating'),
                    text: 'Hits Per Day',
                  },
                  {
                    itemIndex: 3,
                    callback: () => console.log('Navigating'),
                    text: 'Weekly Hits',
                  },
                ],
              },
              {
                itemIndex: 3,
                href: 'https://marketplace.reapit.cloud',
                iconId: 'marketplaceMenu',
                text: 'Marketplace',
              },
              {
                itemIndex: 4,
                callback: () => console.log('Logging out'),
                isSecondary: true,
                iconId: 'logoutMenu',
                text: 'Logout',
              },
            ]}
          />
        </MediaStateProvider>
      </NavStateProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleToggleLogo', () => {
  it('should set logo state', () => {
    const logoState = 'reapitLogoSelectedMenu'
    const setLogoState = jest.fn()
    const curried = handleToggleLogo(logoState, setLogoState)

    curried()

    expect(setLogoState).toHaveBeenCalledWith('reapitLogoMenu')
  })
})

describe('clickNavEventHandler', () => {
  it('should handle a click event', () => {
    const setActive = jest.fn()
    const event = ({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown) as MouseEvent<HTMLAnchorElement | HTMLDivElement>

    const curried = clickNavEventHandler(setActive)

    curried(event)

    expect(setActive).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})
