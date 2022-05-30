import * as React from 'react'
import { render } from '../../../tests/react-testing'
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
    expect(toJson(render(<CameraImageInput {...props} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
