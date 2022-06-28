import { AppsBrowseConfigCollection } from './use-apps-browse-state'

// Stubbing out the config API
const appsBrowseConfigCollectionDev: AppsBrowseConfigCollection = {
  data: [
    {
      filters: {
        id: ['cfbe6f29-4003-4648-aa5a-8eb777bd606e'],
      },
      content: {
        title: 'New in AppMarket Admin',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        imageUrl: 'http://placekitten.com/1000/360',
      },
      configType: 'featuredHeroApps',
    },
    {
      filters: {
        id: ['dab46391-b07d-4869-8614-139aa798cc1f'],
      },
      content: {
        title: 'Discover Amazing Apps',
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        imageUrl: 'http://placekitten.com/1000/360',
      },
      configType: 'heroApps',
    },
    {
      filters: {
        id: ['795fc578-8232-4dbd-a5ff-1240135c0a52'],
      },
      content: {
        brandColour: '#0061a8',
        strapline: 'Lorem ipsum dolor sit amet, consectetur adip',
        imageUrl: 'http://placekitten.com/1000/360',
      },
      configType: 'heroApps',
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
        imageUrl: 'http://placekitten.com/100/100',
      },
      configType: 'appsFilters',
    },
    {
      filters: {
        desktopIntegrationTypeId: ['Contact', 'IdCheck', 'Applicant', 'Tenancy'],
      },
      content: {
        title: 'Indentity Apps',
      },
      configType: 'featuredApps',
    },
    {
      filters: {
        isFree: true,
      },
      content: {
        title: 'Free Apps',
      },
      configType: 'simpleApps',
    },
  ],
}

const appsBrowseConfigCollectionProd: AppsBrowseConfigCollection = {
  data: [],
}

export const appsBrowseConfigCollection =
  window.reapit.config.appEnv === 'production' ? appsBrowseConfigCollectionProd : appsBrowseConfigCollectionDev
