import * as React from 'react'
import { render } from '@testing-library/react'
import {
  Spreadsheet,
  UploadButton,
  DownloadButton,
  AddRowButton,
  renderErrorElements,
  getErrorsFromData,
} from '../index'
import { data } from '../__stubs__'
import { Cell } from '../types'

describe('Spreadsheet', () => {
  it('should match snapshot with default props', () => {
    expect(render(<Spreadsheet data={data} />)).toMatchSnapshot()
  })
  it('should match snapshot with full props', () => {
    expect(
      render(
        <Spreadsheet
          data={data}
          description="des"
          hasUploadButton={false}
          hasDownloadButton={false}
          hasAddButton={false}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('UploadButton', () => {
  it('should match snapshot', () => {
    const onChangeInput = jest.fn()
    expect(render(<UploadButton onChangeInput={onChangeInput} />)).toMatchSnapshot()
  })
})

describe('DownloadButton', () => {
  it('should match snapshot', () => {
    expect(render(<DownloadButton data={data} />)).toMatchSnapshot
  })
})

describe('AddRowButton', () => {
  it('should match snapshot', () => {
    const addNewRow = jest.fn()
    expect(render(<AddRowButton addNewRow={addNewRow} />)).toMatchSnapshot()
  })
})

describe('getErrorsFromData', () => {
  it('should match snapshot', () => {
    const errors = [[{ error: 'error', touched: true }]] as Cell[][]
    expect(render(<div>{getErrorsFromData(errors)}</div>)).toMatchSnapshot()
  })
})

describe('renderErrorElements', () => {
  it('should match snapshot', () => {
    const errors = [[{ error: 'error', touched: true }]] as Cell[][]
    expect(render(<div>{renderErrorElements(errors)}</div>)).toMatchSnapshot()
  })
})
