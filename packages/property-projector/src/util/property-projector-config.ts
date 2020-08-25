import { PropertyProjectorConfig } from '@/types/global'
import { ReapitConnectSession } from '@reapit/connect-session'


export const getPropertyProjectorConfig = async (session: ReapitConnectSession): Promise<PropertyProjectorConfig> => {
  let propertyProjectorConfig: any = {
    logo: '',
    primaryColour: '#006580',
    secondaryColour: '#FFFFFF',
    interval: 5,
    propertyLimit: 25,
    marketingMode: ['sales', 'lettings'],
    sellingStatus: ['forSale', 'underOffer'],
    lettingStatus: ['toLet', 'underOffer'],
    minPrice: 0,
    maxPrice: 0,
    minRent: 0,
    maxRent: 0,
    showAddress: true,
    sortBy: 'created',
    departments: {},
    offices: [],
  };

  const response = await fetch("http://localhost:3000/dev/v1/property-projector-config/ABC/RPT")
  .then(async response => {
    const data = await response.json();
    // check for error response
    if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    delete data['customerId'];
    delete data['officeId'];  
    propertyProjectorConfig = {...propertyProjectorConfig, ...data};
    return propertyProjectorConfig;
  })
  .catch(error => {
    console.error('There was an error retrieving the configuration.', error);
  });

 return propertyProjectorConfig;
}
