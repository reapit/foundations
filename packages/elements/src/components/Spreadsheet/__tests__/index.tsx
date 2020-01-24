import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { shallow } from 'enzyme'
import { Spreadsheet, UploadButton, DownloadButton, AddRowButton, handleEffect } from '../index'
import { data, setContextMenuProp } from '../__stubs__'

describe('Spreadsheet', () => {
  it('should match snapshot with default props', () => {
    expect(shallow(<Spreadsheet data={data} />)).toMatchSnapshot()
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
    ).toMatchSnapshot()
  })
})

describe('UploadButton', () => {
  it('should match snapshot', () => {
    const onChangeInput = jest.fn()
    expect(shallow(<UploadButton onChangeInput={onChangeInput} />)).toMatchSnapshot()
  })
})

describe('DownloadButton', () => {
  it('should match snapshot', () => {
    expect(shallow(<DownloadButton data={data} />)).toMatchSnapshot
  })
})

describe('AddRowButton', () => {
  it('should match snapshot', () => {
    const addNewRow = jest.fn()
    expect(shallow(<AddRowButton addNewRow={addNewRow} />)).toMatchSnapshot()
  })
})

describe('handleEffect', () => {
  it('should add event', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const hideContextMenu = jest.fn().mockReturnValue(() => {})
    const fn = handleEffect(setContextMenuProp)
    fn()
    expect(addEventListenerSpy).toHaveBeenCalled()
  })
})
