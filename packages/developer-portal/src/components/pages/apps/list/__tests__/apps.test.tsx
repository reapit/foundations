import React from 'react'
import { AppsPage } from '../apps'
import { appsDataStub } from '../../../../../sagas/__stubs__/apps'
import { render } from '../../../../../tests/react-testing'

describe('AppsPage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsPage apps={appsDataStub.data} refreshApps={jest.fn()} />)).toMatchSnapshot()
  })
})
