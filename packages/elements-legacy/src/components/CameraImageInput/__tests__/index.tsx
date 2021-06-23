import * as React from 'react'
import { shallow } from 'enzyme'
import { FileInputProps } from '../../FileInput'
import { CameraImageInput } from '../index'
import toJson from 'enzyme-to-json'

const props: FileInputProps = {
  name: 'test',
  id: 'test',
  labelText: 'test',
}

describe('CameraImageInput', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<CameraImageInput {...props} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
