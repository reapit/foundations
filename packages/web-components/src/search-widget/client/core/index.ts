import SearchWidget from '../components/search-widget.svelte'
import { ThemeStyles } from '../../../common/styles/index'

export interface SearchWidgeInitializers {
  theme: ThemeStyles
  apiKey: string
  target?: HTMLElement
}

export const ReapitSearchWidgetComponent = ({ target = document.body, apiKey, theme }: SearchWidgeInitializers) =>
  new SearchWidget({
    target,
    props: {
      theme,
      apiKey,
    },
  })

Object.defineProperty(window, 'ReapitSearchWidgetComponent', {
  value: ReapitSearchWidgetComponent,
})
