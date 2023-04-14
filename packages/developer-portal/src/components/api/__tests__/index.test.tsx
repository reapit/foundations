import React from 'react'
import { Api } from '../index'
import { render } from '../../../tests/react-testing'
import { mockDeveloperModel } from '../../../tests/__stubs__/developers'

jest.mock('../../../core/use-global-state')

describe('Api', () => {
  process.env.swaggerWhitelist = [mockDeveloperModel.id as string]
  it('should match a snapshot', () => {
    expect(render(<Api />)).toMatchSnapshot()
  })
})
