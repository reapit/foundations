import { Test } from '@nestjs/testing'
import { SSM } from 'aws-sdk'
import { ParameterProvider } from '../parameter-provider'
import { AwsModule } from '../../aws'
import { INestApplication } from '@nestjs/common'

process.env.NODE_ENV = 'local'

class MockSSM {
  getParameter(params, callback): any {
    callback(
      params.Name === 'cloud-throw-error'
        ? {
            code: 'ParameterNotFound',
          }
        : undefined,
      params.Name === 'cloud-throw-error'
        ? undefined
        : {
            Parameter: {
              Value: JSON.stringify({ parameter: 'value' }),
            },
          },
    )
  }

  putParameter(params, callback): any {
    callback(undefined)
  }

  deleteParameter(): any {}
}

describe('ParameterProvider', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AwsModule],
      providers: [ParameterProvider],
    })
      .overrideProvider(SSM)
      .useClass(MockSSM)
      .compile()

    app = module.createNestApplication()
  })

  describe('GetParameters', () => {
    it('return empty object on param not found', async () => {
      const parameterProvider = app.get<ParameterProvider>(ParameterProvider)

      const result = await parameterProvider.obtainParameters('throw-error')

      expect(result).toStrictEqual({})
      expect(result).toBeInstanceOf(Object)
    })

    it('returns parameter value', async () => {
      const parameterProvider = app.get<ParameterProvider>(ParameterProvider)

      const result = await parameterProvider.obtainParameters('not-error')

      expect(result).toStrictEqual({
        parameter: 'value',
      })
    })
  })

  describe('updateParameters', () => {
    it('returns parameter value', async () => {
      const parameterProvider = app.get<ParameterProvider>(ParameterProvider)

      try {
        await parameterProvider.saveParameters('existing-params', {
          newValue: 'a new value',
          anotherValue: 'second value',
        })
        expect(true).toBeTruthy()
      } catch (e) {
        expect(true).toBeFalsy()
      }
    })
  })
})
