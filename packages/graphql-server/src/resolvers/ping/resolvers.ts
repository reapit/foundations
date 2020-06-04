export const pingResolver = (): string => {
  return 'Services is running'
}

export default {
  Query: {
    Ping: pingResolver,
  },
}
