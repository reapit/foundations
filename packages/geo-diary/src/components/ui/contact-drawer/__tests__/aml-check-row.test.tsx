import React from 'react'
import { render } from '../../../tests/react-testing'
import { AmlCheckRow } from '../aml-check-row'

describe('AmlCheckRow', () => {
  it('should match snapshot', () => {
    window.reapit.config.amlAppUrl = 'https://some-url'
    expect(render(<AmlCheckRow name="Will" contactId="SOME_ID" />)).toMatchSnapshot()
  })
})
