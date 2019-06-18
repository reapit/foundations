import { ItemItem } from '../../reducers/item'

export const itemDataStub: ItemItem = {
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
