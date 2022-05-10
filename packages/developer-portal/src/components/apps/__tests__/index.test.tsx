import React from 'react'
import Apps from '..'
import { render } from '../../../tests/react-testing'

jest.mock('../../../core/use-global-state')
window.reapit.config.pipelineWhitelist = ['MOCK_APP_ID']

describe('Apps', () => {
  it('should match a snapshot', () => {
    expect(render(<Apps />)).toMatchSnapshot()
  })
})
