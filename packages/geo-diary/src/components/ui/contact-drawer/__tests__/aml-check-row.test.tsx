import React from 'react'
import { shallow } from 'enzyme'
import { AmlCheckRow } from '../aml-check-row'

describe('AmlCheckRow', () => {
  it('should match snapshot', () => {
    window.reapit.config.amlAppUrl = 'https://some-url'
    expect(shallow(<AmlCheckRow name="Will" contactId="SOME_ID" />)).toMatchSnapshot()
  })
})
