import BookViewingWidget from '../components/book-viewing-widget.svelte'
import { InitializerTheme } from '../../../common/styles/index'

export interface PropertyData {
  image: string
  address: string
  price: string
}
export interface BookViewingWidgetInitializers {
  theme: Partial<InitializerTheme>
  apiKey: string
  customerId: string
  parentSelector: string
}

export const ReapitBookViewingWidget = ({
  parentSelector,
  apiKey,
  customerId,
  theme,
}: BookViewingWidgetInitializers) => {
  return new BookViewingWidget({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      customerId,
      parentSelector,
    },
  })
}

Object.defineProperty(window, 'ReapitBookViewingWidget', {
  value: ReapitBookViewingWidget,
})
