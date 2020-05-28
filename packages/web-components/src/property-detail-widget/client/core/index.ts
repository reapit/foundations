import PropertyDetailWidget from '../components/property-detail-widget.svelte'
import { InitializerTheme } from '../../../common/styles'

export interface PropertyDetailWidgetInitializers {
  theme: Partial<InitializerTheme>
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
