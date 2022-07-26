import { AppsBrowseConfigCollection } from './use-apps-browse-state'

// Stubbing out the config API
const appsBrowseConfigCollectionDev: AppsBrowseConfigCollection = {
  data: [
    {
      filters: {
        id: ['cfbe6f29-4003-4648-aa5a-8eb777bd606e'],
      },
      content: {
        title: 'New in AppMarket',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        imageUrl: '',
      },
      configType: 'featuredHeroApps',
      live: {
        isLive: true,
      },
    },
    {
      filters: {
        id: ['dab46391-b07d-4869-8614-139aa798cc1f'],
      },
      content: {
        title: 'Discover Amazing Apps',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        imageUrl: '',
      },
      configType: 'heroApps',
      live: {
        isLive: true,
      },
    },
    {
      filters: {
        id: ['795fc578-8232-4dbd-a5ff-1240135c0a52'],
      },
      content: {
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        imageUrl: '',
      },
      configType: 'heroApps',
      live: {
        isLive: true,
      },
    },
    {
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
      configType: 'appsFilters',
      live: {
        isLive: true,
      },
    },
    {
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
      configType: 'appsFilters',
      live: {
        isLive: true,
      },
    },
    {
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
      configType: 'appsFilters',
      live: {
        isLive: true,
      },
    },
    {
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
      configType: 'appsFilters',
      live: {
        isLive: true,
      },
    },
    {
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
      configType: 'appsFilters',
      live: {
        isLive: true,
      },
    },
    {
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
      configType: 'appsFilters',
      live: {
        isLive: true,
      },
    },
    {
      filters: {
        desktopIntegrationTypeId: ['Contact', 'IdCheck', 'Applicant', 'Tenancy'],
      },
      content: {
        title: 'Indentity Apps',
      },
      configType: 'featuredApps',
      live: {
        isLive: true,
      },
    },
    {
      filters: {
        isFree: true,
      },
      content: {
        title: 'Free Apps',
      },
      configType: 'simpleApps',
      live: {
        isLive: true,
      },
    },
  ],
}

const appsBrowseConfigCollectionProd: AppsBrowseConfigCollection = {
  data: [],
}

export const appsBrowseConfigCollection =
  window.reapit.config.appEnv === 'production' ? appsBrowseConfigCollectionProd : appsBrowseConfigCollectionDev
