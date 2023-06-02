import { NavigateFunction } from 'react-router'

export const openNewPage = (uri: string) => () => {
  window.open(uri, '_blank')
}

export const navigateRoute = (navigate: NavigateFunction, route: string) => (): void => {
  navigate(route)
}
