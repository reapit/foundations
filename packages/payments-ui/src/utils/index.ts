import { History } from 'history'

export const navigate = (history: History, route: string) => (): void => {
  history.push(route)
}
