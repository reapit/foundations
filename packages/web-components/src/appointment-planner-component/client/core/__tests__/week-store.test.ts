import { createWeekStore, createDerivedDayOfWeek, getDayOfWeek, WeekStore } from '../week-store'
import { get, derived } from 'svelte/store'
import dayjs from 'dayjs'

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
    const result: any[] = []

    for (let i = 23; i <= 29; i++) {
      result.push(dayjs(`2020-03-${i}T00:00:00.000Z`))
    }

    expect(getDayOfWeek(dayJsInstance)).toEqual(result)
  })
})

describe('createWeekStore', () => {
  it('set initial day correctly when calling createWeekStore with date', () => {
    const comparedDate = new Date()
    const store = createWeekStore(comparedDate)

    const comparedDayJs = dayjs(comparedDate)
    const storeDayJs = get(store)

    comparedDayJs.isSame(storeDayJs)
  })
})

describe('weekStore', () => {
  it('increase date correctly when calling increment', () => {
    const initDate = new Date('4-30-2020')
    const store = createWeekStore(initDate)

    store.increment()

    const comparedDayJs = dayjs('5-6-2020')
    const storeDayJs = get(store)

    comparedDayJs.isSame(storeDayJs)
  })

  it('decrease date correctly when calling decrement', () => {
    const initDate = new Date('4-30-2020')
    const store = createWeekStore(initDate)

    store.decrement()

    const comparedDayJs = dayjs('4-23-2020')
    const storeDayJs = get(store)

    comparedDayJs.isSame(storeDayJs)
  })
})
