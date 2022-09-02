import { RouteComponentProps } from 'react-router'

export function getMockRouterProps<P>(data: P, historyLength: number = 2) {
  const location = {
    hash: '',
    key: '',
    pathname: '',
    search: '?token=123',
    state: {},
  }

  const props = {
    match: {
      isExact: true,
      params: data,
      path: '',
      url: '',
    },
    location: location,
    history: {
      length: historyLength,
      action: 'POP',
      location: location,
      push: jest.fn(),
      replace: jest.fn(),
      go: jest.fn(),
      goBack: jest.fn(),
      goForward: jest.fn(),
      block: jest.fn(),
      createHref: () => '',
      listen: jest.fn(),
    },
    staticContext: {},
  } as RouteComponentProps

  return props
}
