import React from 'react'
import { useReapitGet } from '@reapit/use-reapit-data'
import { Installations } from '../index'
import { render } from '../../../tests/react-testing'
import { mockInstallationModelPagedResult } from '../../../tests/__stubs__/installations'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('Installations', () => {
  it('should render component when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<Installations />)).toMatchSnapshot()
  })

  it('should render component with data', () => {
    mockUseReapitGet.mockReturnValue([mockInstallationModelPagedResult, false])
    expect(render(<Installations />)).toMatchSnapshot()
  })
})
