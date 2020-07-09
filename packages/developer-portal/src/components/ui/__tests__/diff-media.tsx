import * as React from 'react'
import { shallow } from 'enzyme'
import DiffMedia, { DiffMediaProps } from '../diff-media'

const props: DiffMediaProps = {
  changedMedia: 'image-1',
  currentMedia: 'image-2',
}

describe('DiffMedia', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DiffMedia {...props} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
