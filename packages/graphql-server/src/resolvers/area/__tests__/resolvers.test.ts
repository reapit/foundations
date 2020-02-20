import areaServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'

import { queryArea, queryAreas, mutationCreateArea, mutationUpdateArea } from '../resolvers'

jest.mock('../services', () => ({
  getAreaById: jest.fn(),
  getAreas: jest.fn(),
  createArea: jest.fn(),
  updateArea: jest.fn(),
}))

describe('queryArea', () => {
  it('')
});
