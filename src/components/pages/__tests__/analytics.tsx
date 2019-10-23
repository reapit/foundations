import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import DesktopApiDocs from '../desktop-api-docs'

jest.mock('../../../core/store')

describe('DesktopApiDocs', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DesktopApiDocs />))).toMatchSnapshot()
  })
})
