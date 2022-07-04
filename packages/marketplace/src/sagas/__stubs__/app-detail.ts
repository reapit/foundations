import { appPermissionStub } from './app-permission'

export const appDetailDataStub = {
  data: {
    id: '9b6fd5f7-2c15-483d-b925-01b650538e52',
    name: "Peter's Properties",
    summary: 'vitae elementum curabitur vitae',
    description: 'enim facilisis',
    developer: "Pete's Proptech World Ltd",
    supportEmail: 'support@reapit.com',
    telephone: '0113 288 2900',
    homePage: 'https://myawesomeproptechproduct.io',
    media: [
      {
        uri: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/7d88729f-2366-4561-9d5c-282615f3946b.jpeg',
        description: 'Application Icon',
        type: 'icon',
      },
      {
        uri: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/c4a36706-aa44-47f9-9fb6-9053eef4e581.png',
        description: 'Application Image',
        type: 'image',
      },
      {
        uri: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/65bd3b97-e78c-41cd-b75f-e06e1d2f00df.png',
        description: 'Application Image',
        type: 'image',
      },
    ],
    scopes: appPermissionStub,
    isWebComponent: true,
    installationId: '123',
  },
}
