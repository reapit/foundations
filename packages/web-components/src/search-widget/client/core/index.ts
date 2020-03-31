import SearchWidget from '../components/search-widget.svelte'
import { InitializerTheme } from '../../../common/styles/index'

export interface SearchWidgeInitializers {
  theme: Partial<InitializerTheme>
  apiKey: string
  target: string
}

export const ReapitSearchWidgetComponent = ({ target, apiKey, theme }: SearchWidgeInitializers) =>
  new SearchWidget({
    target: document.querySelector(target) || document.body,
    props: {
      theme,
      apiKey,
      target,
    },
  })

Object.defineProperty(window, 'ReapitSearchWidgetComponent', {
  value: ReapitSearchWidgetComponent,
})
