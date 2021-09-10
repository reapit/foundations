export const generateEslintrc = () =>
  JSON.stringify(
    {
      extends: 'react-app',
    },
    null,
    2,
  )
