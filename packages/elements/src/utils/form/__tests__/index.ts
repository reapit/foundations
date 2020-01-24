import { checkError } from '../index'
import { FieldMetaProps } from 'formik'

describe('checkError', () => {
  it('should return true', () => {
    const input = {
      value: '123',
      error: '123',
      touched: true
    } as FieldMetaProps<string>
    const result = checkError(input)
    expect(result).toEqual(true)
  })
  it('should return false', () => {
    const input = {
      value: '123',
      error: '',
      touched: true
    } as FieldMetaProps<string>
    const result = checkError(input)
    expect(result).toEqual(false)
  })
  it('should return false', () => {
    const input = {
      value: '123',
      error: '123',
      touched: false
    } as FieldMetaProps<string>
    const result = checkError(input)
    expect(result).toEqual(false)
  })
})
