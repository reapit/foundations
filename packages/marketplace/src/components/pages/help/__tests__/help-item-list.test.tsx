import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { HelpItemList } from '../help-item-list'

describe('HelpItemList', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<HelpItemList items={[]} />))).toMatchSnapshot()
  })
})
