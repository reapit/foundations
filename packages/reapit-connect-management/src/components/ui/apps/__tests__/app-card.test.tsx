import * as React from 'react'
import { mount } from 'enzyme'
import AppCard from '../app-card'

describe('AppCard', () => {
  it('should match a snapshot', () => {
    const stubApp = { name: 'APP_NAME', developer: 'APP_DEVELOPER' }
    expect(mount(<AppCard app={stubApp} />)).toMatchSnapshot()
  })
})
