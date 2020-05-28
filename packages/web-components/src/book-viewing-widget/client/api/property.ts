import { PropertyData } from '../core'

export const getProperty = async (): Promise<PropertyData> => {
  return Promise.resolve({
    image:
      'https://tracker.reapit.net/demo/_demo/webservice/rest/property/rps_demo-SCO190002/thumbnail?ApiKey=8ed799bbe77c96311e71f64b99ec2ddde765d13a&Width=480&Height=285&Crop=1',
    address: 'Little Tingewick, Buckingham',
    price: '£1,250,000',
  })
}
