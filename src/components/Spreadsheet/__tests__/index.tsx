import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { shallow } from 'enzyme'
import { Spreadsheet, UploadButton, DownloadButton, AddRowButton } from '../index'
import { data } from '../__stubs__'

describe('Spreadsheet', () => {
  it('should match snapshot with default props', () => {
    expect(shallow(<Spreadsheet data={data} />))
  })
  it('should match snapshot with full props', () => {
    expect(
      shallow(
        <Spreadsheet
          data={data}
          description="des"
          hasUploadButton={false}
          hasDownloadButton={false}
          hasAddButton={false}
        />
      )
    )
  })
})

describe('UploadButton', () => {
  it('should match snapshot', () => {
    const onChangeInput = jest.fn()
    expect(shallow(<UploadButton onChangeInput={onChangeInput} />))
  })
})

describe('DownloadButton', () => {
  it('should match snapshot', () => {
    expect(shallow(<DownloadButton data={data} />))
  })
})

describe('AddRowButton', () => {
  it('should match snapshot', () => {
    const addNewRow = jest.fn()
    expect(shallow(<AddRowButton addNewRow={addNewRow} />))
  })
})
