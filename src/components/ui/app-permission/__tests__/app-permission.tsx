import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AppPermission from '../app-permission'

describe('AppDetailInner', () => {
  it('should match a snapshot when appDetailModalState = VIEW_DETAIL', () => {
    const props = {
      afterClose: jest.fn()
    }
    expect(toJson(shallow(<AppPermission {...props} />))).toMatchSnapshot()
  })
})
