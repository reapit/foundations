import PropertyDetail from '../components/property-detail.svelte'
import { InitializerTheme } from '../../../common/styles'

export interface PropertyDetailInitializers {
  theme: Partial<InitializerTheme>
  apiKey: string
  customerId: string
  parentSelector: string
}

export const ReapitPropertyDetailComponent = ({
  parentSelector,
  apiKey,
  theme,
  customerId,
}: PropertyDetailInitializers) =>
  new PropertyDetail({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      customerId,
      parentSelector,
    },
  })

Object.defineProperty(window, 'ReapitPropertyDetailComponent', {
  value: ReapitPropertyDetailComponent,
})
