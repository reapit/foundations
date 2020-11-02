import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { HelpItemList } from '../help-item-list'
import { helpItems } from '@/components/pages/help/help'
import { LoginIdentity } from '@reapit/connect-session'

describe('HelpItemList', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<HelpItemList items={helpItems({} as LoginIdentity)} />))).toMatchSnapshot()
  })
})
