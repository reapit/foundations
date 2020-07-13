import React from 'react'
import { mount } from 'enzyme'
import HandleLegacyRoutesModal from '../handle-legacy-routes-modal'

describe('AppContent', () => {
  test('AppContent - should match snapshoot', () => {
    expect(mount(<HandleLegacyRoutesModal />)).toMatchSnapshot()
  })
})
