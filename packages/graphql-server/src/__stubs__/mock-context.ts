import { ServerContext } from '../utils'
import { mockAppointmentType } from '../resolvers/configurations/__stubs__/mock-appointment-types'
import { mockProperties } from '../resolvers/properties/__stubs__/mock-properties'
import { mockOffices } from '../resolvers/offices/__stubs__/mock-offices'
import { mockNegotiators } from '../resolvers/negotiators/__stubs__/mock-negotiators'

export const mockContext = {
  traceId: 'mockTraceId',
  authorization: 'mockAuthorization',
  dataLoader: {
    configurationLoader: {
      load: jest.fn().mockResolvedValue(() => mockAppointmentType) as any,
      loadMany: jest.fn().mockResolvedValue(() => mockAppointmentType) as any,
    },
    propertyLoader: {
      load: jest.fn().mockResolvedValue(() => mockProperties) as any,
      loadMany: jest.fn().mockResolvedValue(() => mockProperties) as any,
    },
    officeLoader: {
      load: jest.fn().mockResolvedValue(() => mockOffices) as any,
      loadMany: jest.fn().mockResolvedValue(() => mockOffices) as any,
    },
    negotiatorLoader: {
      load: jest.fn().mockResolvedValue(() => mockNegotiators) as any,
      loadMany: jest.fn().mockResolvedValue(() => mockNegotiators) as any,
    },
  },
} as ServerContext
