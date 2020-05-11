import SearchWidget from '../components/search-widget.svelte'
import { InitializerTheme } from '../../../common/styles/index'

export interface SearchWidgeInitializers {
  theme: Partial<InitializerTheme>
  apiKey: string
  customerId: string
  parentSelector: string
}

export const ReapitSearchWidgetComponent = ({ parentSelector, apiKey, customerId, theme }: SearchWidgeInitializers) =>
  new SearchWidget({
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
