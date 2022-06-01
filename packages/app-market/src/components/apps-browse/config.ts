import { AppsBrowseConfigCollection } from './use-apps-browse-state'

const appsBrowseConfigCollectionDev: AppsBrowseConfigCollection = {
  featuredHeroApps: [
    {
      filters: {
        id: ['FOO'],
      },
      content: {
        title: 'New in AppMarket',
        brandColour: '',
        strapline: 'Geo Diary',
        heroImageUrl: 'http://placekitten.com/1000/360',
      },
    },
    {
      filters: {
        id: ['FOO'],
      },
      content: {
        title: 'Discover Amazing Apps',
        brandColour: '',
        strapline: 'AML Checklist',
        heroImageUrl: 'http://placekitten.com/1000/360',
      },
    },
    {
      filters: {
        id: ['FOO'],
      },
      content: {
        brandColour: '',
        strapline: 'Geo Foo Bar',
        heroImageUrl: 'http://placekitten.com/1000/360',
      },
    },
  ],
  appsFilters: [],
  featuredApps: [],
  simpleApps: [],
}

const appsBrowseConfigCollectionProd: AppsBrowseConfigCollection = {
  featuredHeroApps: [],
  appsFilters: [],
  featuredApps: [],
  simpleApps: [],
}

export const appsBrowseConfigCollection =
  window.reapit.config.appEnv === 'production' ? appsBrowseConfigCollectionProd : appsBrowseConfigCollectionDev
