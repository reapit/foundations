import App from './app.svelte'
import { InitializerTheme } from '../../../common/styles/index'

export interface SearchWidgeInitializers {
  theme: Partial<InitializerTheme>
  apiKey: string
  customerId: string
  parentSelector: string
}

export const ReapitSearchWidgetComponent = ({ parentSelector, apiKey, theme }: SearchWidgeInitializers) =>
  new App({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      customerId,
      parentSelector,
    },
  })

Object.defineProperty(window, 'ReapitSearchWidgetComponent', {
  value: ReapitSearchWidgetComponent,
})
