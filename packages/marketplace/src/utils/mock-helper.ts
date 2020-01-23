import { RouteComponentProps } from 'react-router'
import { Href } from 'history'

export function getMockRouterProps<P>(data: P) {
  const location = {
    hash: '',
    key: '',
    pathname: '',
    search: '?token=123',
    state: {}
  }

  const props: RouteComponentProps<P> = {
    match: {
      isExact: true,
      params: data,
      path: '',
      url: ''
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
      block: jest.fn(),
      createHref: () => '',
      listen: jest.fn()
    },
    staticContext: {}
  }

  return props
}
