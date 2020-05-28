import dayjs from 'dayjs'
import { createDerivedDayOfWeek, getDayOfWeek } from '../derrived'
import { WeekStore } from '../store'
import { derived } from 'svelte/store'

jest.mock('../store', () => ({
  mockStore: jest.fn(),
}))
jest.mock('svelte/store', () => ({
  derived: jest.fn(() => 'return by derrived'),
}))

describe('createDerivedDayOfWeek', () => {
  it('should call derived with correct parameters', () => {
    const mockStore = {}
    const returnByCreateDerivedDayOfWeek = createDerivedDayOfWeek(mockStore as WeekStore)
    expect(derived).toHaveBeenCalledWith(mockStore, getDayOfWeek)
    expect(returnByCreateDerivedDayOfWeek).toBe('return by derrived')
  })
})

describe('getDayOfWeek', () => {
  it('should return correctly', () => {
    const dayJsInstance = dayjs('2020-03-24T00:00:00.000Z')
    const result = []

    for (let i = 23; i <= 29; i++) {
      result.push(dayjs(`2020-03-${i}T00:00:00.000Z`))
    }

    expect(getDayOfWeek(dayJsInstance)).toEqual(result)
  })
})
