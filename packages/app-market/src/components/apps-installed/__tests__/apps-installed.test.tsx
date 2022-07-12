import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppsInstalled } from '../apps-installed'
import { useReapitGet } from '@reapit/utils-react'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppsInstalled', () => {
  it('should match a snapshot with data', () => {
    mockUseReapitGet.mockReturnValue([mockAppSummaryModelPagedResult, false])

    expect(render(<AppsInstalled />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, false])

    expect(render(<AppsInstalled />)).toMatchSnapshot()
  })
})
