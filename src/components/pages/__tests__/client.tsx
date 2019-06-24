import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Client, ClientProps } from '../client'

const props: ClientProps = {
  logout: jest.fn()
}

describe('Client', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Client {...props} />))).toMatchSnapshot()
  })
})
