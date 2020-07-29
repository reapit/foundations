import { writable, Readable, derived } from 'svelte/store'
import en from 'dayjs/locale/en'
import weekday from 'dayjs/plugin/weekday'
import dayjs, { Dayjs } from 'dayjs'

export type WeekStore = {
  increment: () => void
  decrement: () => void
} & Pick<Readable<Dayjs>, 'subscribe'>

/**
 * https://github.com/iamkun/dayjs/issues/215
 * set the beginning of a week to be monday instead of sunday
 */
dayjs.locale({
  ...en,
  weekStart: 1,
})

dayjs.extend(weekday)

export const createWeekStore = (initialDate: Date = new Date()) => {
  const { update, subscribe } = writable<Dayjs>(dayjs(initialDate))

  return {
    subscribe,
    increment: () => update(store => store.add(1, 'w')),
    decrement: () => update(store => store.subtract(1, 'w')),
  }
}

export const weekStore: WeekStore = createWeekStore()

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
