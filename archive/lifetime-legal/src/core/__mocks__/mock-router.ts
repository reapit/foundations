import { RouteComponentProps } from 'react-router'
import { UnregisterCallback, Href } from 'history'

// This is to mock out the dependencies for react router
export function getMockRouterProps<P>(data: P | {}) {
  const location = {
    hash: 'mockHash',
    key: 'mockKey',
    pathname: 'mockPathname',
    search: 'mockSearch',
    state: {},
  }

  const props: RouteComponentProps<P | {}> = {
    match: {
      isExact: true,
      params: data,
      path: '/mockPathname',
      url: '/mockPathname',
    },
    location: location,
    history: {
      length: 2,
      action: 'POP',
      location: location,
      push: jest.fn(),
      replace: jest.fn(),
      go: jest.fn(),
      goBack: jest.fn(),
      goForward: jest.fn(),
      block: () => {
        const temp: UnregisterCallback = () => {}
        return temp
      },
      createHref: () => {
        const temp: Href = ''
        return temp
      },
      listen: () => {
        const temp: UnregisterCallback = () => {}
        return temp
      },
    },
    staticContext: {},
  }

  return props
}
