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

export const usageStatsForMultipleAppsDataStub: UsageStatsModel = {
  dateFrom: '2020-02-09T09:18:23.957Z',
  dateTo: '2020-02-09T09:18:23.957Z',
  totalRequestsForPeriod: 13,
  appUsage: [
    {
      appId: '09043eb8-9e5e-4650-b7f1-f0cb62699027',
      requestsForPeriod: 7,
      usage: [
        {
          date: '2020-02-09T09:18:23.957Z',
          requests: 2,
        },
        {
          date: '2020-02-01T09:18:23.957Z',
          requests: 5,
        },
        {
          date: '2020-02-05T09:18:23.957Z',
          requests: 0,
        },
      ],
    },
    {
      appId: '261da083-cee2-4f5c-a18f-8f9375f1f5af',
      requestsForPeriod: 6,
      usage: [
        {
          date: '2020-02-09T09:18:23.957Z',
          requests: 3,
        },
        {
          date: '2020-02-01T09:18:23.957Z',
          requests: 3,
        },
        {
          date: '2020-02-05T09:18:23.957Z',
          requests: 0,
        },
      ],
    },
  ],
}
