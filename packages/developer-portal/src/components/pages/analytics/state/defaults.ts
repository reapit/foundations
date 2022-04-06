import dayjs from 'dayjs'
import { AnalyticsFilterState } from './use-analytics-state'

export const defaultAnalyticsFilterState: AnalyticsFilterState = {
  dateFrom: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
  dateTo: dayjs().format('YYYY-MM-DD'),
  monthFrom: dayjs().format('YYYY-MM'),
  monthTo: dayjs().format('YYYY-MM'),
  appId: '',
  clientId: '',
}
