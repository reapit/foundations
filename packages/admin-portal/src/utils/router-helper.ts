import { History } from 'history'

export function canGoBack(history: History) {
  return history.length > 2
}
