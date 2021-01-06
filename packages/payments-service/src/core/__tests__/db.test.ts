import { db } from '../db'
import { DataMapper } from '@aws/dynamodb-data-mapper'

describe('db', () => {
  it('should return an instance of DataMapper', () => {
    expect(db instanceof DataMapper).toBe(true)
  })
})
