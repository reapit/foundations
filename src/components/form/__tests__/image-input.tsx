import * as React from 'react'
import { shallow } from 'enzyme'
import { FileInputProps } from '../file-input'
import ImageInput from '../image-input'
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
