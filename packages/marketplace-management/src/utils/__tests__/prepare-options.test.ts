import { prepareOfficeOptions, prepareUserGroupOptions } from '../prepare-options'

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

describe('prepareUserGroupOptions', () => {
  it('prepareUserGroupOptions should return true result', () => {
    const data = [
      { id: 'Group A', description: 'Alice description' },
      { id: 'Group B', description: 'Bob description' },
    ]
    const expected = [
      { label: 'Group A', value: 'Group A', description: 'Alice description' },
      { label: 'Group B', value: 'Group B', description: 'Bob description' },
    ]
    expect(prepareUserGroupOptions(data)).toEqual(expected)
  })
})
