import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { shallow } from 'enzyme'
import { Spreadsheet } from '../index'
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
