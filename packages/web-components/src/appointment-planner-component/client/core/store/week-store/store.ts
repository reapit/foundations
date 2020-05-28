import { writable, Readable } from 'svelte/store'
import dayjs, { Dayjs } from 'dayjs'

export type WeekStore = {
  increment: () => void
  decrement: () => void
} & Pick<Readable<Dayjs>, 'subscribe'>

export const createWeekStore = (initialDate: Date = new Date()) => {
  const { update, subscribe } = writable<Dayjs>(dayjs(initialDate))

  return {
    subscribe,
    increment: () => update(store => store.add(1, 'w')),
    decrement: () => update(store => store.subtract(1, 'w')),
  }
}

export const weekStore: WeekStore = createWeekStore()
