import * as React from 'react'
import { shallow } from 'enzyme'
import { FileInputProps } from '../../FileInput'
import { ImageInput, validateType, isImageType, getTypeFromBase64 } from '../index'
import toJson from 'enzyme-to-json'

describe('getTypeFromBase64', () => {
  it('should return correctly', () => {
    const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'

    const result = getTypeFromBase64(base64)
    expect(result).toEqual('image/png')
  })
})

describe('isImageType', () => {
  it('should return true', () => {
    const input = 'image/jpeg'
    const output = true
    const result = isImageType(input)
    expect(result).toEqual(output)
  })
})

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
    expect(result).toBe(true)
  })

  it('should return error', () => {
    const base64 = 'data:video/png;base64,iVBORw0KGgoAAAANSUhEUgAA'
    const result = validateType(base64)
    expect(result).toBe(false)
  })
})
