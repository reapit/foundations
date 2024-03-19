import { dataIdFromObject } from '../../graphql/client'
import { StoreObject } from '@apollo/client'

describe('client', () => {
  describe('dataIdFromObject', () => {
    it('should run correctly', () => {
      const mockObject = {
        __typename: 'mockType',
        id: '1',
      } as Readonly<StoreObject>
      const result = dataIdFromObject(mockObject)
      const output = `${mockObject.__typename}:${mockObject.id}`
      expect(result).toEqual(output)
    })
  })
})
