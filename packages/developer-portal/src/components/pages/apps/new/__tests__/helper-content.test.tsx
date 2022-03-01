import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { HelperContent } from '../helper-content'

jest.mock('../../state/use-app-state')

describe('HelperContent', () => {
  it('should match a snapshot', () => {
    expect(render(<HelperContent />)).toMatchSnapshot()
  })
})
