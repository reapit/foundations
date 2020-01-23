import * as React from 'react'
import { shallow } from 'enzyme'
import DiffViewer, { DiffViewerProps } from '../diff-viewer'
import toJson from 'enzyme-to-json'

const props: DiffViewerProps = {
  currentString: 'abc',
  changedString: 'axxxxxxxxxxxbc'
}

describe('DiffViewer', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DiffViewer {...props} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
