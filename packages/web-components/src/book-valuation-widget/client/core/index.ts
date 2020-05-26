import BookValuationWidget from '../components/book-valuation-widget.svelte'
import { BookValuationWidgetInitializerTheme } from './theme'

export interface BookValuationWidgetInitializers {
  theme: BookValuationWidgetInitializerTheme
  apiKey: string
  // customerId: string
  parentSelector: string
  variant: 'VIEWING' | 'VALUATION'
}

export const ReapitBookValuationWidget = ({
  parentSelector,
  theme,
  variant,
}: // apiKey,
// variant,
BookValuationWidgetInitializers) =>
  new BookValuationWidget({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      // TODO - will need to reference later
      // apiKey,
      // customerId,
      variant,
      parentSelector,
    },
  })

Object.defineProperty(window, 'ReapitBookValuationWidget', {
  value: ReapitBookValuationWidget,
})
