import * as React from 'react'
import { shallow } from 'enzyme'
import { mockSpreadSheetDataForUpdateCase, mockOfficeCellRenderProps } from '../__mocks__/negotiators'
import NegotiatorStatusCheckbox, { NegotiatorStatusCheckboxProps } from '../negotiator-status-checkbox'

const mockProps: NegotiatorStatusCheckboxProps = {
  cellRenderProps: mockOfficeCellRenderProps,
  updateNegotiator: jest.fn(),
  data: mockSpreadSheetDataForUpdateCase,
}

describe('NegotiatorStatusCheckbox', () => {
  it('should match a snapshot', () => {
    expect(shallow(<NegotiatorStatusCheckbox {...mockProps} />)).toMatchSnapshot()
  })
})
