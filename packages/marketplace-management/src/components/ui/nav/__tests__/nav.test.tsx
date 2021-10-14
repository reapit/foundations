import * as React from 'react'
import { shallow } from 'enzyme'
import { Nav, callbackAppClick, navigate, getDefaultNavIndex } from '../nav'
import { History } from 'history'
import Routes from '../../../../constants/routes'

describe('Nav', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('navigate', () => {
    it('should open a new page', () => {
      const mockHistory = {
        push: jest.fn(),
      } as unknown as History

      const curried = navigate(mockHistory, Routes.USERS)
      curried()

      expect(mockHistory.push).toHaveBeenCalledWith(Routes.USERS)
    })
  })

  describe('callbackAppClick', () => {
    it('should run correcly', () => {
      const fn = callbackAppClick()
      expect(fn).toEqual('https://marketplace.reapit.cloud/installed')
    })
  })

  describe('getDefaultNavIndex', () => {
    const routes = [
      {
        route: Routes.OFFICES,
        index: 1,
      },
      {
        route: Routes.OFFICES_GROUPS,
        index: 1,
      },
      {
        route: Routes.USERS,
        index: 2,
      },
      {
        route: Routes.USERS_GROUPS,
        index: 2,
      },
      {
        route: Routes.MARKETPLACE,
        index: 3,
      },
      {
        route: Routes.MARKETPLACE_APP,
        index: 3,
      },
      {
        route: '/',
        index: 0,
      },
    ]

    routes.forEach((route) => {
      it(`should correctly return the default nav index for ${route.route}`, () => {
        expect(getDefaultNavIndex(route.route)).toEqual(route.index)
      })
    })
  })
})
