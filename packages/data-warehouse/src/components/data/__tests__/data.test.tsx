import React from 'react'
import { useReapitGet } from '@reapit/use-reapit-data'
import { render } from '../../../tests/react-testing'
import { mockDataSets } from '../../../tests/__stubs__/data-sets'
import Data from '../data'
import { mockShares } from '../../../tests/__stubs__/shares'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('Data', () => {
  it('should match a snapshot with data', () => {
    mockUseReapitGet.mockReturnValueOnce([mockDataSets, false]).mockReturnValueOnce([mockShares, false])
    expect(render(<Data />)).toMatchSnapshot()
  })
  it('should match a snapshot with no data and loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<Data />)).toMatchSnapshot()
  })
})
