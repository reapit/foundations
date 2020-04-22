import { RouteComponentProps } from 'react-router'
import { UnregisterCallback, Href } from 'history'

// This is to mock out the dependencies for react router
export function getMockRouterProps<P>({ params, search = '' }: { params: P; search: string }) {
  const location = {
    hash: 'mockHash',
    key: 'mockKey',
    pathname: 'mockPathname',
    search: search,
    state: {},
  }

  const props: RouteComponentProps<P | {}> = {
    match: {
      isExact: true,
      params: params || {},
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
        // tslint:disable-next-line:no-empty
        const temp: UnregisterCallback = () => {}
        return temp
      },
      createHref: () => {
        const temp: Href = ''
        return temp
      },
      listen: () => {
        // tslint:disable-next-line:no-empty
        const temp: UnregisterCallback = () => {}
        return temp
      },
    },
    staticContext: {},
  }

  return props
}
