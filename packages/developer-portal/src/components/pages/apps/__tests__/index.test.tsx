import React from 'react'
import { Apps } from '../index'
import { appsDataStub as mockApps } from '../../../../sagas/__stubs__/apps'
import { render } from '../../../../tests/react-testing'
import { useReapitGet } from '@reapit/utils-react'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockApps.data, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('Apps', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<Apps />)).toMatchSnapshot()
  })

  it('should match a snapshot when apps are loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])

    expect(render(<Apps />)).toMatchSnapshot()
  })

  it('should match a snapshot when no apps are created', () => {
    mockUseReapitGet.mockReturnValue([{ totalCount: 0 }, false])

    expect(render(<Apps />)).toMatchSnapshot()
  })
})
