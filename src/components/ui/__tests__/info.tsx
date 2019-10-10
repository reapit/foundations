import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Info from '../info'

describe('Info', () => {
  it('should match a snapshot', () => {
    expect(
      toJson(
        shallow(
          <Info>
            <h3>Hello world</h3>
            <a href="/">Go Back</a>
          </Info>
        )
      )
    ).toMatchSnapshot()
  })
})
