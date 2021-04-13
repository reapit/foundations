import BookViewingWidget from '../components/book-viewing-widget.svelte'
import { ThemeBookingInitializer } from '../../../common/styles/types'

export interface BookViewingWidgetInitializers {
  theme: Partial<ThemeBookingInitializer>
  apiKey: string
  customerId: string
  parentSelector: string
  submitAction: (email: string) => any
}

export const ReapitBookViewingWidget = ({
  parentSelector,
  apiKey,
  customerId,
  theme,
  submitAction,
}: BookViewingWidgetInitializers) => {
  return new BookViewingWidget({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      customerId,
      parentSelector,
      submitAction,
    },
  })
}

Object.defineProperty(window, 'ReapitBookViewingWidget', {
  value: ReapitBookViewingWidget,
})
