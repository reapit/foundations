import { withHTML } from '@whitespace/storybook-addon-html/react'

export const parameters = {
  controls: { expanded: true },
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  withHTML({
    prettier: {
      tabWidth: 4,
      useTabs: false,
      htmlWhitespaceSensitivity: 'strict',
    },
  }),
]
