import * as React from 'react'
import { shallow } from 'enzyme'
import NegotiatorOfficeSelectbox, {
  NegotiatorOfficeSelectboxProps,
  handleOnChange,
} from '../negotiator-office-selectbox'
import { offices } from '../../offices-tab/__mocks__/offices'
import { mockSpreadSheetDataForUpdateCase, mockOfficeCellRenderProps } from '../__mocks__/negotiators'

const mockProps: NegotiatorOfficeSelectboxProps = {
  cellRenderProps: mockOfficeCellRenderProps,
  createNegotiator: jest.fn(),
  spreadsheetData: mockSpreadSheetDataForUpdateCase,
  officeData: offices,
  data: [[]],
}

describe('NegotiatorOfficeSelectbox', () => {
  it('should match a snapshot', () => {
    expect(shallow(<NegotiatorOfficeSelectbox {...mockProps} />)).toMatchSnapshot()
  })

  describe('handleOnChange', () => {
    it('should run correctly', () => {
      const setValue = jest.fn()
      const createNegotiator = jest.fn().mockResolvedValue(true)
      const setData = jest.fn()
      const data = {}
      const fn = handleOnChange(offices, setValue, mockSpreadSheetDataForUpdateCase, 1, createNegotiator, data, setData)
      expect(fn).toBeInstanceOf(Function)
      fn({ target: { value: 'REA' } })
      expect(setValue).toBeCalled()
      expect(createNegotiator).toBeCalled()
    })
  })
})
