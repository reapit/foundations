import * as React from 'react'
import { render } from '../../../tests/react-testing'
import toJson from 'enzyme-to-json'

import { HelpItemList } from '../help-item-list'

describe('HelpItemList', () => {
  it('should match a snapshot', () => {
    expect(toJson(render(<HelpItemList items={[]} />))).toMatchSnapshot()
  })
})
