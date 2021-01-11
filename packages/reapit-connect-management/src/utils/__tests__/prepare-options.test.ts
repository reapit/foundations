import { prepareOfficeOptions } from '../prepare-options'

describe('prepareOfficeOptions', () => {
  it('prepareOfficeOptions should return true result', () => {
    const data = [
      { id: '123', name: 'Alice' },
      { id: '456', name: 'Bob' },
    ]
    const expected = [
      { label: 'Alice', value: '123', description: 'Alice' },
      { label: 'Bob', value: '456', description: 'Bob' },
    ]
    expect(prepareOfficeOptions(data)).toEqual(expected)
  })
})
