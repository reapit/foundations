import { createWeekStore } from '../store'
import { get } from 'svelte/store'
import dayjs from 'dayjs'

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
