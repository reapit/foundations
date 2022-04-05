import { BillingBreakdownForMonthV2Model, ServiceItemBillingV2Model } from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { AnalyticsFilterState } from './../state/use-analytics-state'

export const getMonthsRange = (analyticsFilterState: AnalyticsFilterState, format: string): string[] => {
  const { monthFrom, monthTo } = analyticsFilterState
  const numberMonths = dayjs(monthTo).diff(dayjs(monthFrom), 'month') + 1
  const monthRequests: string[] = []

  for (let i = 0; i < numberMonths; i++) {
    monthRequests.push(dayjs(monthTo).subtract(i, 'month').format(format))
  }

  return monthRequests
}

export const aggregateItems = (items: ServiceItemBillingV2Model[]): ServiceItemBillingV2Model[] =>
  items.reduce<ServiceItemBillingV2Model[]>((aggregatedItems, item) => {
    const aggregatedItem = aggregatedItems.find((aggregatedItem) => {
      return aggregatedItem.name === item.name
    })

    if (!aggregatedItem) {
      aggregatedItems.push(item)
    } else {
      aggregatedItem.amount = (aggregatedItem.amount ?? 0) + (item.amount ?? 0)
      aggregatedItem.cost = (aggregatedItem.cost ?? 0) + (item.cost ?? 0)
      aggregatedItem.itemCount = (aggregatedItem.itemCount ?? 0) + (item.itemCount ?? 0)
      aggregatedItem.items = aggregateItems([...(aggregatedItem.items ?? []), ...(item.items ?? [])])
    }
    return aggregatedItems
  }, [])

export const handleAggregateBillingData = (billing: BillingBreakdownForMonthV2Model[]) => () =>
  billing.reduce(
    (billingAggregated, nextBillingItem): BillingBreakdownForMonthV2Model => {
      if (billingAggregated.totalCost && nextBillingItem.totalCost) {
        billingAggregated.totalCost = billingAggregated.totalCost + nextBillingItem.totalCost
      } else {
        billingAggregated.totalCost = nextBillingItem.totalCost
      }

      nextBillingItem.services?.forEach((service) => {
        const aggregatedService = billingAggregated.services?.find((item) => item.name === service.name)

        if (!aggregatedService) {
          billingAggregated.services?.push(service)
        } else {
          aggregatedService.amount = (aggregatedService.amount ?? 0) + (service.amount ?? 0)
          aggregatedService.cost = (aggregatedService.cost ?? 0) + (service.cost ?? 0)
          aggregatedService.itemCount = (aggregatedService.itemCount ?? 0) + (service.itemCount ?? 0)
          aggregatedService.items = aggregateItems([...(aggregatedService.items ?? []), ...(service.items ?? [])])
        }
      })

      return billingAggregated
    },
    { services: [], totalCost: 0 },
  )

export const flattenBillingData = (services: ServiceItemBillingV2Model[]) =>
  services?.reduce<(string | number | undefined)[][]>(
    (accumulator, { items, name, amount, cost, itemCount }) => {
      accumulator.push([name, itemCount, amount, cost])
      if (items?.length) {
        accumulator.push(...flattenBillingData(items))
      }
      return accumulator
    },
    [['Service Name', 'Item Count', 'Number Items', 'Cost']],
  )
