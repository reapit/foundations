import React from 'react'
import { useReapitGet } from '@reapit/use-reapit-data'
import { AppsPage } from '../index'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, true, undefined, jest.fn()]),
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
