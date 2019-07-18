import { PagedResultAppSummaryModel_ } from '@/types/marketplace-api-schema'

export const appsDataStub: { data: PagedResultAppSummaryModel_ } = {
  data: {
    data: [
      {
        id: '09043eb8-9e5e-4650-b7f1-f0cb62699027',
        developerId: '28c9ea52-7f73-4814-9e00-4e3714b8adeb',
        name: 'test',
        summary:
          'nXXT2zaK807ysWgy8F0WEhIYRP3TgosAtfuiLtQCImoSx0kynxbIF0nkGHU36Oz13kM3DG0Bcsicr8L6eWFKLBg4axlmiOEWcvwHAbBP9LRvoFkCl58k1wjhOExnpaZItEyOT1AXVKv8PE44aMGtVz',
        developer: "Pete's Proptech World Ltd",
        homePage: 'http://google.com/abc',
        iconUri:
          'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/d10e790c-2bf2-40ae-9c43-82c1534bde31.png',
        links: [
          {
            rel: 'self',
            href: 'http://platformdemo.reapit.net/marketplace/apps/09043eb8-9e5e-4650-b7f1-f0cb62699027',
            action: 'GET'
          },
          {
            rel: 'developer',
            href: 'http://platformdemo.reapit.net/marketplace/developers/28c9ea52-7f73-4814-9e00-4e3714b8adeb',
            action: 'GET'
          }
        ]
      },
      {
        id: '261da083-cee2-4f5c-a18f-8f9375f1f5af',
        developerId: '28c9ea52-7f73-4814-9e00-4e3714b8adeb',
        name: 'asd',
        summary:
          'asdQiiAJTmXGxPin7pwUiCsepZWXz1EJS71eGlvgPKH4hpE6J8DRDpzP2kDdOwpQPr4aHCCwWwxBJwzARLa7wMpJh5J61GhmQjLfKZkcDd47L9WEfQYVYAj0DTPJP0BuUMAAg2',
        developer: "Pete's Proptech World Ltd",
        homePage: 'http://www.contoso.com/path',
        iconUri:
          'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/1d38c5ec-e3c0-4138-9fe0-e77bce4034d1.octet-stream',
        links: [
          {
            rel: 'self',
            href: 'http://platformdemo.reapit.net/marketplace/apps/261da083-cee2-4f5c-a18f-8f9375f1f5af',
            action: 'GET'
          },
          {
            rel: 'developer',
            href: 'http://platformdemo.reapit.net/marketplace/developers/28c9ea52-7f73-4814-9e00-4e3714b8adeb',
            action: 'GET'
          }
        ]
      }
    ],
    pageNumber: 1,
    pageSize: 2,
    pageCount: 2,
    totalCount: 6
  }
}
