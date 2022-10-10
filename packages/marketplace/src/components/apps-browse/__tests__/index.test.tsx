import React from 'react'
import { render } from '../../../tests/react-testing'
import AppsBrowsePage from '..'

jest.mock('../../../core/analytics')
jest.mock('../../../core/use-apps-browse-state')

describe('AppsBrowsePage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsBrowsePage />)).toMatchSnapshot()
  })
})
