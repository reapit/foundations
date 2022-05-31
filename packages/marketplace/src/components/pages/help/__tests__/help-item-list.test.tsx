import * as React from 'react'
import { render } from '../../../../tests/react-testing'

import { HelpItemList } from '../help-item-list'

describe('HelpItemList', () => {
  it('should match a snapshot', () => {
    expect(render(<HelpItemList items={[]} />)).toMatchSnapshot()
  })
})
