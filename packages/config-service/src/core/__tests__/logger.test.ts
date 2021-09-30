import { logger } from '../logger'
import { createLogger } from '@reapit/utils-node'

jest.mock('@reapit/utils-node', () => ({
  createLogger: jest.fn(),
}))

describe('logger', () => {
  it('should creare a logger', () => {
    logger
    expect(createLogger).toHaveBeenCalledWith('config-service')
  })
})
