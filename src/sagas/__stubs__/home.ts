import { HomeItem } from '../../reducers/home'

export const homeDataStub: HomeItem = {
  data: {
    children: [
      {
        data: {
          id: 'someid',
          title: 'Title',
          url: 'http://something.com'
        }
      }
    ]
  }
}
