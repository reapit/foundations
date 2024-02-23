export const resolveParamName = ({
  nameSpace,
  projectName,
  env,
}: {
  nameSpace: string
  projectName: string
  env: string
}): string =>
  `/${[nameSpace, projectName, env]
    .map((word) => {
      return word
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
    })
    .join('/')}`
