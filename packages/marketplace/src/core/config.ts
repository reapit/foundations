import { AppsBrowseConfigEnum } from '@reapit/foundations-ts-definitions'
import { AppsBrowseConfigCollection } from './use-apps-browse-state'

// Stubbing out the config API
const appsBrowseConfigCollectionDev: AppsBrowseConfigCollection = {
  items: [
    {
      id: 'MOCK_ID',
      index: 0,
      filters: {
        id: ['cfbe6f29-4003-4648-aa5a-8eb777bd606e'],
      },
      content: {
        title: 'New in AppMarket',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        imageUrl: '',
      },
      configType: 'featuredHeroApps' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 0,
      filters: {
        id: ['dab46391-b07d-4869-8614-139aa798cc1f'],
      },
      content: {
        title: 'Discover Amazing Apps',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        imageUrl: '',
      },
      configType: 'heroApps' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 0,
      filters: {
        id: ['795fc578-8232-4dbd-a5ff-1240135c0a52'],
      },
      content: {
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        imageUrl: 'https://image.com',
      },
      configType: 'heroApps' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 0,
      filters: {
        id: [
          '795fc578-8232-4dbd-a5ff-1240135c0a52',
          'dab46391-b07d-4869-8614-139aa798cc1f',
          'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
        ],
      },
      content: {
        title: 'Reapit Developed Apps',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        iconName: 'webDeveloperInfographic',
      },
      configType: 'appsFilters' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 1,
      filters: {
        id: [
          '795fc578-8232-4dbd-a5ff-1240135c0a52',
          'dab46391-b07d-4869-8614-139aa798cc1f',
          'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
        ],
      },
      content: {
        title: 'Reapit Developed Apps',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        iconName: 'webDeveloperInfographic',
      },
      configType: 'appsFilters' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 2,
      filters: {
        id: [
          '795fc578-8232-4dbd-a5ff-1240135c0a52',
          'dab46391-b07d-4869-8614-139aa798cc1f',
          'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
        ],
      },
      content: {
        title: 'Reapit Developed Apps',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        iconName: 'webDeveloperInfographic',
      },
      configType: 'appsFilters' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 3,
      filters: {
        id: [
          '795fc578-8232-4dbd-a5ff-1240135c0a52',
          'dab46391-b07d-4869-8614-139aa798cc1f',
          'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
        ],
      },
      content: {
        title: 'Reapit Developed Apps',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        iconName: 'webDeveloperInfographic',
      },
      configType: 'appsFilters' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 4,
      filters: {
        id: [
          '795fc578-8232-4dbd-a5ff-1240135c0a52',
          'dab46391-b07d-4869-8614-139aa798cc1f',
          'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
        ],
      },
      content: {
        title: 'Reapit Developed Apps',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        iconName: 'webDeveloperInfographic',
      },
      configType: 'appsFilters' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 5,
      filters: {
        id: [
          '795fc578-8232-4dbd-a5ff-1240135c0a52',
          'dab46391-b07d-4869-8614-139aa798cc1f',
          'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
        ],
      },
      content: {
        title: 'Reapit Developed Apps',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        iconName: 'webDeveloperInfographic',
      },
      configType: 'appsFilters' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 0,
      filters: {
        isFree: true,
      },
      content: {
        title: 'Indentity Apps',
      },
      configType: 'featuredApps' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
    {
      index: 0,
      filters: {
        isFree: true,
      },
      content: {
        title: 'Free Apps',
      },
      configType: 'simpleApps' as AppsBrowseConfigEnum,
      live: {
        isLive: true,
      },
    },
  ],
}

const appsBrowseConfigCollectionProd: AppsBrowseConfigCollection = {
  items: [],
}

export const appsBrowseConfigCollection =
  process.env.appEnv === 'production' ? appsBrowseConfigCollectionProd : appsBrowseConfigCollectionDev
