import React from 'react'
import { Routes } from '../../constants/routes'
import { render } from '../../tests/react-testing'
import Router, { history } from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    Object.keys(Routes).forEach((route) => {
      history.push(Routes[route])
      expect(render(<Router />)).toMatchSnapshot()
    })
  })
})
