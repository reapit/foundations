import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AdminHome, AdminHomeProps } from '../admin'

const props: AdminHomeProps = {
  adminState: {
    loading: false,
    appRevisions: []
  }
}

describe('AdminHome', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AdminHome {...props} />))).toMatchSnapshot()
  })
})
