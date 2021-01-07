import { logger } from '../logger'
import { createLogger } from '@reapit/node-utils'

jest.mock('@reapit/node-utils', () => ({
  createLogger: jest.fn(),
}))

describe('logger', () => {
  it('should creare a logger', () => {
    logger
    expect(createLogger).toHaveBeenCalledWith('payments-service')
  })
})
