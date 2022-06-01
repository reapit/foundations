import React from 'react'
import { render } from '../../../tests/react-testing'
import AppsInstalledPage from '..'

describe('AppsInstalledPage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsInstalledPage />)).toMatchSnapshot()
  })
})
