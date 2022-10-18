import React from 'react'
import { useReapitGet } from '@reapit/utils-react'
import { Installations } from '../index'
import { render } from '../../../tests/react-testing'
import { mockInstallationModelPagedResult } from '../../../tests/__stubs__/installations'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
  objectToQuery: jest.fn(),
  SearchableMultiSelect: () => <div />,
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('Installations', () => {
  it('should render component when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<Installations />)).toMatchSnapshot()
  })

  it('should render component with data', () => {
    mockUseReapitGet
      .mockReturnValue([mockInstallationModelPagedResult, false])
      .mockReturnValue([mockAppSummaryModelPagedResult, false])
    expect(render(<Installations />)).toMatchSnapshot()
  })
})
