import * as React from 'react'
import { shallow } from 'enzyme'
import NegotiatorOfficeSelectbox, { NegotiatorOfficeSelectboxProps } from '../negotiator-office-selectbox'
import { offices } from '../../offices-tab/__mocks__/offices'
import { mockSpreadSheetDataForUpdateCase, mockOfficeCellRenderProps } from '../__mocks__/negotiators'

const mockProps: NegotiatorOfficeSelectboxProps = {
  cellRenderProps: mockOfficeCellRenderProps,
  createNegotiator: jest.fn(),
  spreadsheetData: mockSpreadSheetDataForUpdateCase,
  officeData: offices,
}

describe('NegotiatorOfficeSelectbox', () => {
  it('should match a snapshot', () => {
    expect(shallow(<NegotiatorOfficeSelectbox {...mockProps} />)).toMatchSnapshot()
  })
})
