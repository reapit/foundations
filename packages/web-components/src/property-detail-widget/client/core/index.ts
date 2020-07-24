import PropertyDetailWidget from '../components/property-detail-widget.svelte'
import { ThemeBaseInitializer } from '../../../common/styles/types'

export interface PropertyDetailWidgetInitializers {
  theme: Partial<ThemeBaseInitializer>
  apiKey: string
  customerId: string
  parentSelector: string
}

export const ReapitPropertyDetailWidget = ({
  parentSelector,
  apiKey,
  theme,
  customerId,
}: PropertyDetailWidgetInitializers) =>
  new PropertyDetailWidget({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      customerId,
      parentSelector,
    },
  })

Object.defineProperty(window, 'ReapitPropertyDetailWidget', {
  value: ReapitPropertyDetailWidget,
})
