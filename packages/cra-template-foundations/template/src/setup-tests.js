jest.mock('@linaria/core', () => {
  return {
    css: jest.fn(() => ''),
    cx: jest.fn(() => ''),
  }
})

Object.defineProperty(window, 'reapit', {
  value: {
    config: {
      connectClientId: 'SOME_CLIENT_ID',
      connectOAuthUrl: 'SOME_OAUTH_URL',
    },
  },
})
