import { derived } from 'svelte/store'
import { WeekStore, weekStore } from './store'
import dayjs, { Dayjs } from 'dayjs'
import en from 'dayjs/locale/en'
import weekday from 'dayjs/plugin/weekday'

/**
 * https://github.com/iamkun/dayjs/issues/215
 * set the beginning of a week to be monday instead of sunday
 */
dayjs.locale({
  ...en,
  weekStart: 1,
})

dayjs.extend(weekday)

export const getDayOfWeek = (dayjsInstance: Dayjs) => {
  const daysOfWeek: dayjs.Dayjs[] = []

  for (let i = 0; i <= 6; i++) {
    daysOfWeek.push(dayjsInstance.weekday(i))
  }

  return daysOfWeek
}

export const createDerivedDayOfWeek = (weekStore: WeekStore) => {
  /**
   * return all days belonged to the week that the field "date" in the weekStore belonged
   */
  const daysOfWeek = derived(weekStore, getDayOfWeek)
  return daysOfWeek
}

export const derrivedDayOfWeek = createDerivedDayOfWeek(weekStore)
