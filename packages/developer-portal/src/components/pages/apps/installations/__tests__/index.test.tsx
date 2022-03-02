import React from 'react'
import AppInstallations from '..'
import { render } from '../../../../../tests/react-testing'
import { useReapitGet } from '@reapit/utils-react'
import { installationsStub as mockInstallations } from '../../../../../sagas/__stubs__/installations'

jest.mock('../../state/use-app-state')
jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppInstallations', () => {
  it('should match a snapshot', () => {
    mockUseReapitGet.mockReturnValueOnce([{ ...mockInstallations }])

    expect(render(<AppInstallations />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true])

    expect(render(<AppInstallations />)).toMatchSnapshot()
  })

  it('should match a snapshot when no installations', () => {
    mockUseReapitGet.mockReturnValueOnce([{ totalCount: 0 }, false])

    expect(render(<AppInstallations />)).toMatchSnapshot()
  })

  it('should match a snapshot when no response', () => {
    mockUseReapitGet.mockReturnValueOnce([null, false])

    expect(render(<AppInstallations />)).toMatchSnapshot()
  })
})
