import { prepareOfficeOptions } from '../prepare-options'

describe('prepareOfficeOptions', () => {
  it('prepareOfficeOptions should return true result', () => {
    const data = [
      { id: '123', name: 'Alice' },
      { id: '456', name: 'Bob' },
    ]
    const expected = [
      { label: 'Alice', value: '123' },
      { label: 'Bob', value: '456' },
    ]
    expect(prepareOfficeOptions(data)).toEqual(expected)
  })
})
