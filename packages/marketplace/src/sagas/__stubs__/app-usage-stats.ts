import { UsageStatsModel } from '@reapit/foundations-ts-definitions'

export const usageStatsDataStub: UsageStatsModel = {
  dateFrom: '2019-11-09T00:00:00+00:00',
  dateTo: '2020-02-07T00:00:00+00:00',
  totalRequestsForPeriod: 5,
  appUsage: [
    {
      appId: '09043eb8-9e5e-4650-b7f1-f0cb62699027',
      requestsForPeriod: 5,
      usage: [
        {
          date: '2019-11-15T00:00:00+00:00',
          requests: 5,
        },
      ],
    },
  ],
}
