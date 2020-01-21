import * as React from 'react'
import { shallow } from 'enzyme'
import PackageDocs from '../package-docs'

jest.mock('../../../core/store')

describe('PackageDocs', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PackageDocs />)).toMatchSnapshot()
  })
})
