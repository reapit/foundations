import React from 'react'
import { useReapitGet } from '@reapit/utils-react'
import { AppsPage } from '../index'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, true, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn()]),
  objectToQuery: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppsPage', () => {
  it('should render a component when loading', () => {
    expect(render(<AppsPage />)).toMatchSnapshot()
  })

  it('should render a component when has data', () => {
    mockUseReapitGet.mockReturnValueOnce([mockAppSummaryModelPagedResult, false, null, jest.fn()])
    expect(render(<AppsPage />)).toMatchSnapshot()
  })
})
