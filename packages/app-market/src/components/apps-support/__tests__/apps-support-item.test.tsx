import React from 'react'
import { AppsSupportItem } from '../apps-support-item'
import { render } from '../../../tests/react-testing'
import { useReapitGet } from '@reapit/utils-react'
import { mockAppDetailModel, mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

jest.mock('@reapit/utils-react', () => ({
  ...jest.requireActual('@reapit/utils-react'),
  useReapitGet: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppsSupportItem', () => {
  it('should match a snapshot', () => {
    mockUseReapitGet.mockReturnValue([{ ...mockAppDetailModel }])

    expect(
      render(<AppsSupportItem app={(mockAppSummaryModelPagedResult.data as AppSummaryModel[])[0]} />),
    ).toMatchSnapshot()
  })
})
