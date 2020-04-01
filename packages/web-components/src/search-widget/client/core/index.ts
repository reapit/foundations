import SearchWidget from '../components/search-widget.svelte'
import { InitializerTheme } from '../../../common/styles/index'

export interface SearchWidgeInitializers {
  theme: Partial<InitializerTheme>
  apiKey: string
  parentSelector: string
}

export const ReapitSearchWidgetComponent = ({ parentSelector, apiKey, theme }: SearchWidgeInitializers) =>
  new SearchWidget({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      parentSelector,
    },
  })

Object.defineProperty(window, 'ReapitSearchWidgetComponent', {
  value: ReapitSearchWidgetComponent,
})
