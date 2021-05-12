import { ServerContext } from '../utils'
import { appointmentTypeMock } from '../resolvers/configurations/__stubs__/mock-appointment-types'
import { propertiesMock } from '../resolvers/properties/__stubs__/mock-properties'
import { officesMock } from '../resolvers/offices/__stubs__/mock-offices'
import { negotiatorsMock } from '../resolvers/negotiators/__stubs__/mock-negotiators'

export const mockContext = {
  traceId: 'mockTraceId',
  authorization: 'mockAuthorization',
  dataLoader: {
    configurationLoader: {
      load: jest.fn().mockResolvedValue(() => appointmentTypeMock) as any,
      loadMany: jest.fn().mockResolvedValue(() => appointmentTypeMock) as any,
    },
    propertyLoader: {
      load: jest.fn().mockResolvedValue(() => propertiesMock) as any,
      loadMany: jest.fn().mockResolvedValue(() => propertiesMock) as any,
    },
    officeLoader: {
      load: jest.fn().mockResolvedValue(() => officesMock) as any,
      loadMany: jest.fn().mockResolvedValue(() => officesMock) as any,
    },
    negotiatorLoader: {
      load: jest.fn().mockResolvedValue(() => negotiatorsMock) as any,
      loadMany: jest.fn().mockResolvedValue(() => negotiatorsMock) as any,
    },
  },
} as ServerContext
