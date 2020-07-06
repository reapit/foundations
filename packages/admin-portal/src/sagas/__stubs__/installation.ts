import { InstallationModel } from '@reapit/foundations-ts-definitions'

export const installationStub: InstallationModel = {
  id: 'b3c2f644-3241-4298-b320-b0398ff492f9',
  appId: '062a376c-f5a3-46a0-a64b-e4bc6e5af2c1',
  created: '2019-12-03T05:33:20',
  client: 'DXX',
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
}
