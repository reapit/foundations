import { InstallationModelWithAppName } from '@/components/ui/analytics/detailed/detailed-tab'

export const installedAppsStub: Array<InstallationModelWithAppName> = [
  {
    id: 'b3c2f644-3241-4298-b320-b0398ff492f1',
    appId: '062a376c-f5a3-46a0-a64b-e4bc6e5af2c1',
    created: '2020-01-31T12:57:12',
    client: 'DXX',
    status: 'Active',
    appName: 'App 1',
    links: [
      {
        rel: 'self',
        href: 'http://dev.platformmarketplace.reapit.net/installations/b3c2f644-3241-4298-b320-b0398ff492f9',
        action: 'GET',
      },
      {
        rel: 'app',
        href: 'http://dev.platformmarketplace.reapit.net/apps/062a376c-f5a3-46a0-a64b-e4bc6e5af2c1',
        action: 'GET',
      },
    ],
  },
  {
    id: 'b3c2f644-3241-4298-b320-b0398ff492f2',
    appId: '062a376c-f5a3-46a0-a64b-e4bc6e5af2c2',
    created: '2020-01-31T12:57:12',
    client: 'DXX',
    appName: 'App 2',
    status: 'Active',
    links: [
      {
        rel: 'self',
        href: 'http://dev.platformmarketplace.reapit.net/installations/b3c2f644-3241-4298-b320-b0398ff492f9',
        action: 'GET',
      },
      {
        rel: 'app',
        href: 'http://dev.platformmarketplace.reapit.net/apps/062a376c-f5a3-46a0-a64b-e4bc6e5af2c1',
        action: 'GET',
      },
    ],
  },
  {
    id: 'b3c2f644-3241-4298-b320-b0398ff492f3',
    appId: '062a376c-f5a3-46a0-a64b-e4bc6e5af2c3',
    created: '2020-02-03T01:49:57',
    client: 'DXX',
    appName: 'App 3',
    status: 'Active',
    links: [
      {
        rel: 'self',
        href: 'http://dev.platformmarketplace.reapit.net/installations/b3c2f644-3241-4298-b320-b0398ff492f9',
        action: 'GET',
      },
      {
        rel: 'app',
        href: 'http://dev.platformmarketplace.reapit.net/apps/062a376c-f5a3-46a0-a64b-e4bc6e5af2c1',
        action: 'GET',
      },
    ],
  },
]
