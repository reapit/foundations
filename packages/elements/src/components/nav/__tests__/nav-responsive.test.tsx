import React from 'react'
import { shallow } from 'enzyme'
import { NavResponsive } from '../nav-responsive'
import { NavStateProvider } from '../../../hooks/use-nav-state'
import { MediaStateProvider } from '../../../hooks/use-media-query'

describe('NavResponsive component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
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
                iconId: 'apps',
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
                iconId: 'analytics',
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
                iconId: 'marketplace',
                text: 'Marketplace',
              },
              {
                itemIndex: 4,
                callback: () => console.log('Logging out'),
                isSecondary: true,
                iconId: 'logout',
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
