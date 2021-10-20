import { prepareOfficeOptions, prepareUserGroupOptions } from '../prepare-options'

describe('prepareOfficeOptions', () => {
  it('prepareOfficeOptions should return true result', () => {
    const data = [
      { id: '123', name: 'Alice' },
      { id: '456', name: 'Bob' },
    ]
    const expected = [
      { name: 'Alice', value: '123' },
      { name: 'Bob', value: '456' },
    ]
    expect(prepareOfficeOptions(data)).toEqual(expected)
  })
})

describe('prepareUserGroupOptions', () => {
  it('prepareUserGroupOptions should return true result', () => {
    const data = [{ id: 'Group A' }, { id: 'Group B' }]
    const expected = [
      { name: 'Group A', value: 'Group A' },
      { name: 'Group B', value: 'Group B' },
    ]
    expect(prepareUserGroupOptions(data)).toEqual(expected)
  })
})
