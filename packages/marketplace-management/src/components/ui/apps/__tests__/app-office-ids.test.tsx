import * as React from 'react'
import { shallow } from 'enzyme'
import { AppOfficeIdsCell } from '../app-office-ids-cell'

describe('AppCard', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AppOfficeIdsCell cell={{ value: 'ID_ONE, ID_TWO' }} />)).toMatchSnapshot()
  })
})
