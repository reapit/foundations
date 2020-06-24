import * as React from 'react'
import { shallow } from 'enzyme'
import { FileInputProps } from '../../FileInput'
import { ImageInput, validateType } from '../index'
import toJson from 'enzyme-to-json'

const props: FileInputProps = {
  name: 'test',
  id: 'test',
  labelText: 'test',
}

describe('ImageInput', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<ImageInput {...props} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
describe('validateType', () => {
  it('should return ""', () => {
    const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'
    const result = validateType(base64)
    expect(result).toBe('')
  })

  it('should return error', () => {
    const base64 = 'data:video/png;base64,iVBORw0KGgoAAAANSUhEUgAA'
    const result = validateType(base64)
    expect(result).toBe('You must select the image file!')
  })
})
