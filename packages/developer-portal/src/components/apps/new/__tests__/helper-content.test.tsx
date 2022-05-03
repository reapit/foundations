import React from 'react'
import { render } from '../../../../tests/react-testing'
import { HelperContent } from '../helper-content'

jest.mock('../../state/use-app-state')

describe('HelperContent', () => {
  beforeEach(() => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)
  })

  it('should match a snapshot', () => {
    expect(render(<HelperContent />)).toMatchSnapshot()
  })
})
