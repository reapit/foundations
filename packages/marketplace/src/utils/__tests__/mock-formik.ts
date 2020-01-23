import { mockFormikState, mockFormikComputeProps, mockWithFormik } from '../mock-formik'

describe('mock-formik', () => {
  it('mockFormikState works as expected', () => {
    const input = {}
    const result = mockFormikState(input)
    expect(result).toBeDefined()
  })

  it('mockFormikComputeProps works as expected', () => {
    const input = {}
    const result = mockFormikComputeProps(input)
    expect(result).toBeDefined()
  })

  it('mockWithFormik work as expected', () => {
    const input = {}
    const result = mockWithFormik(input)
    expect(result).toBeDefined()
  })
})
