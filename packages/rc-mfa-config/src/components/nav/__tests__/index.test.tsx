import React from 'react'
import { Nav, getDefaultNavIndex } from '..'
import { Routes } from '../../../constants/routes'
import { render } from '../../../tests/react-testing'

describe('Nav', () => {
  it('should match a snapshot', () => {
    window.location.pathname = '/'
    const wrapper = render(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('getDefaultNavIndex', () => {
  const routes = [
    {
      route: Routes.HOME,
      index: 1,
    },
    {
      route: Routes.ADMIN,
      index: 2,
    },
    {
      route: '/random-route',
      index: 0,
    },
  ]

  routes.forEach((route) => {
    it(`should correctly return the default nav index for ${route.route}`, () => {
      expect(getDefaultNavIndex(route.route)).toEqual(route.index)
    })
  })
})
