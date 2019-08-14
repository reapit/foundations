import * as React from 'react'
import { shallow } from 'enzyme'
import { FileInputProps } from '../../FileInput'
import { ImageInput } from '../index'
import toJson from 'enzyme-to-json'

const props: FileInputProps = {
  name: 'test',
  id: 'test',
  labelText: 'test'
}

describe('ImageInput', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<ImageInput {...props} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
