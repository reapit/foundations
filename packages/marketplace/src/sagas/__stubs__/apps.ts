import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'

export const appsDataStub: AppSummaryModelPagedResult = {
  data: [
    {
      id: '09043eb8-9e5e-4650-b7f1-f0cb62699027',
      developerId: '28c9ea52-7f73-4814-9e00-4e3714b8adeb',
      name: 'test',
      created: '2020-02-02T10:45:57',
      summary:
        'nXXT2zaK807ysWgy8F0WEhIYRP3TgosAtfuiLtQCImoSx0kynxbIF0nkGHU36Oz13kM3DG0Bcsic' +
        'r8L6eWFKLBg4axlmiOEWcvwHAbBP9LRvoFkCl58k1wjhOExnpaZItEyOT1AXVKv8PE44aMGtVz',
      developer: "Pete's Proptech World Ltd",
      homePage: 'https://google.com/abc',
      iconUri: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/d10e790c-2bf2-40ae-9c43-82c1534bde31.png',
      links: [
        {
          rel: 'self',
          href: 'https://platformdemo.reapit.net/marketplace/apps/09043eb8-9e5e-4650-b7f1-f0cb62699027',
          action: 'GET',
        },
        {
          rel: 'developer',
          href: 'https://platformdemo.reapit.net/marketplace/developers/28c9ea52-7f73-4814-9e00-4e3714b8adeb',
          action: 'GET',
        },
      ],
    },
    {
      id: '261da083-cee2-4f5c-a18f-8f9375f1f5af',
      developerId: '28c9ea52-7f73-4814-9e00-4e3714b8adeb',
      name: 'asd',
      created: '2020-02-02T10:45:57',
      summary:
        'asdQiiAJTmXGxPin7pwUiCsepZWXz1EJS71eGlvgPKH4hpE6J8DRDpzP2kDdOwpQPr4aHCCw' +
        'WwxBJwzARLa7wMpJh5J61GhmQjLfKZkcDd47L9WEfQYVYAj0DTPJP0BuUMAAg2',
      developer: "Pete's Proptech World Ltd",
      homePage: 'https://www.contoso.com/path',
      iconUri:
        'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/1d38c5ec-e3c0-4138-9fe0-e77bce4034d1.octet-stream',
      links: [
        {
          rel: 'self',
          href: 'https://platformdemo.reapit.net/marketplace/apps/261da083-cee2-4f5c-a18f-8f9375f1f5af',
          action: 'GET',
        },
        {
          rel: 'developer',
          href: 'https://platformdemo.reapit.net/marketplace/developers/28c9ea52-7f73-4814-9e00-4e3714b8adeb',
          action: 'GET',
        },
      ],
    },
  ],
  pageNumber: 1,
  pageSize: 2,
  pageCount: 2,
  totalCount: 6,
}

export const featuredAppsDataStub: { data: AppSummaryModelPagedResult } = {
  data: {
    data: [
      {
        id: 'da20d0ac-47ab-44c9-af3e-b44e25f2ec2b',
        created: '2019-11-26T03:38:45',
        developerId: '7a96e6b2-3778-4118-9c9b-6450851e5608',
        name: 'Google',
        summary: "Search the world's information, including webpages, images, videos and more.",
        developer: 'Dwarves Foundation',
        homePage: 'https://google.com',
        isListed: true,
        isSandbox: false,
        isFeatured: true,
        iconUri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Google-icon(3).jpg',
        launchUri: 'https://google.com',
        pendingRevisions: false,
        links: [
          {
            rel: 'self',
            href: 'https://dev.platformmarketplace.reapit.net/apps/da20d0ac-47ab-44c9-af3e-b44e25f2ec2b',
            action: 'GET',
          },
          {
            rel: 'developer',
            href: 'https://dev.platformmarketplace.reapit.net/developers/7a96e6b2-3778-4118-9c9b-6450851e5608',
            action: 'GET',
          },
        ],
      },
    ],
    pageNumber: 1,
    pageSize: 3,
    pageCount: 1,
    totalCount: 1,
  },
}
