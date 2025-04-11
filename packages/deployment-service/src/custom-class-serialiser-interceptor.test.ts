import { Test } from '@nestjs/testing'
import { CustomClassSerialiserInterceptor } from './custom-class-serialiser-interceptor'
import { of } from 'rxjs'
import { ExecutionContext } from '@nestjs/common'
import { PipelineEntity } from './entities/pipeline.entity'
import { Reflector } from '@nestjs/core'

describe('CustomClassSerialiserInterceptor', () => {
  let provider: CustomClassSerialiserInterceptor
  const mockGetRequestMethod = jest.fn()

  const mockContext: Partial<ExecutionContext> = {
    // @ts-ignore
    switchToHttp: () => ({
      getRequest: mockGetRequestMethod,
    }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [CustomClassSerialiserInterceptor],
    })
      .overrideProvider(Reflector)
      .useValue({
        getAllAndOverride: jest.fn(() => ({
          type: PipelineEntity,
        })),
      })
      .compile()

    await module.init()

    provider = module.get(CustomClassSerialiserInterceptor)
  })

  it('Will return admin group values', (done) => {
    mockGetRequestMethod.mockImplementationOnce(() => ({
      credentials: {
        groups: ['ReapitEmployeeFoundationsAdmin'],
      },
    }))

    const observable = provider.intercept(mockContext as unknown as ExecutionContext, {
      handle: () =>
        of({
          cloudFrontId: 'cloudFrontId',
          certificateArn: 'certificateArn',
          aRecordId: 'aRecordId',
        }),
    })
    observable.subscribe({
      next: (returnedValue) => {
        expect(returnedValue.certificateArn).toBeDefined()
        expect(returnedValue.cloudFrontId).toBeDefined()
        expect(returnedValue.aRecordId).toBeDefined()
      },
      complete: () => done(),
    })
  })

  it('Will not return admin group values', (done) => {
    mockGetRequestMethod.mockImplementationOnce(() => ({
      credentials: {
        groups: [],
      },
    }))

    const observable = provider.intercept(mockContext as unknown as ExecutionContext, {
      handle: () =>
        of({
          cloudFrontId: 'cloudFrontId',
          certificateArn: 'certificateArn',
          aRecordId: 'aRecordId',
        }),
    })
    observable.subscribe({
      next: (returnedValue) => {
        expect(returnedValue.certificateArn).not.toBeDefined()
        expect(returnedValue.cloudFrontId).not.toBeDefined()
        expect(returnedValue.aRecordId).not.toBeDefined()
      },
      complete: () => done(),
    })
  })
})
