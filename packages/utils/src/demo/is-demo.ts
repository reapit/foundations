export const isDemo = (): boolean => {
  const queryParams = new URLSearchParams(window.location.search)
  const isDemo = queryParams.get('demo')
  return Boolean(isDemo)
}
