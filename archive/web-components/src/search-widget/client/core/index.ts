import SearchWidget from '../components/search-widget.svelte'
import { ThemeBaseInitializer } from '../../../common/styles/types'

export interface SearchWidgeInitializers {
  theme: Partial<ThemeBaseInitializer>
  apiKey: string
  customerId: string
  parentSelector: string
  detailPageUrl: string
}

export const ReapitSearchWidget = ({
  parentSelector,
  apiKey,
  customerId,
  theme,
  detailPageUrl,
}: SearchWidgeInitializers) =>
  new SearchWidget({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      customerId,
      parentSelector,
      detailPageUrl,
    },
  })

Object.defineProperty(window, 'ReapitSearchWidget', {
  value: ReapitSearchWidget,
})
