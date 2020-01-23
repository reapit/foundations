import * as React from 'react'
import { shallow } from 'enzyme'
import DiffMedia, { DiffMediaProps } from '../diff-media'
import toJson from 'enzyme-to-json'

const props: DiffMediaProps = {
  changedMedia: 'image-1',
  currentMedia: 'image-2'
}

describe('DiffMedia', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DiffMedia {...props} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
