import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { FormExample } from '../form.stories'

describe('LayoutComponents', () => {
  it('should match a snapshot for an example form', () => {
    expect(toJson(shallow(<FormExample />))).toMatchSnapshot()
  })
})
