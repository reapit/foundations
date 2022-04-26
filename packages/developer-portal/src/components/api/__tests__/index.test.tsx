import React from 'react'
import { Api } from '../index'
import { render } from '../../../tests/react-testing'

jest.mock('../../../core/use-global-state')

describe('Api', () => {
  it('should match a snapshot', () => {
    expect(render(<Api />)).toMatchSnapshot()
  })
})
