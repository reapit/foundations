import React from 'react'
import { render } from '../../../tests/react-testing'
import AppsInstalledPage from '..'

jest.mock('../../../core/analytics')

describe('AppsInstalledPage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsInstalledPage />)).toMatchSnapshot()
  })
})
