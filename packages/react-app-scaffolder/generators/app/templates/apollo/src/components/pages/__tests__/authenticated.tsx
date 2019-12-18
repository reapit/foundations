import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Authenticated, AuthenticatedProps } from '../authenticated'

const props: AuthenticatedProps = {}

describe('Authenticated', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Authenticated {...props} />))).toMatchSnapshot()
  })
})
