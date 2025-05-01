import Pusher from 'pusher'
import { PusherProvider } from './pusher-provider'
import { PipelineEntity } from '../entities/pipeline.entity'

const mockPusherInstance = {
  trigger: jest.fn(),
  triggerBatch: jest.fn(),
}

describe('PusherProvider', () => {
  const provider = new PusherProvider(mockPusherInstance as unknown as Pusher)

  describe('trigger', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('class-transformer will return serialised PipelineEntity', async () => {
      const pipeline = new PipelineEntity()
      pipeline.repository = {
        // @ts-ignore
        installationId: '12345',
        // @ts-ignore
        repositoryId: '12345',
      }
      await provider.trigger('channel', 'event-name', pipeline)

      expect(mockPusherInstance.trigger).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        expect.objectContaining({
          repository: expect.objectContaining({
            installationId: 12345,
            repositoryId: 12345,
          }),
        }),
      )
    })

    it('class-transformer will ignore objects', async () => {
      const obj = {
        string: 'thisIsAString',
        number: 12345,
        date: new Date(),
      }

      await provider.trigger('channel', 'event-name', obj)

      expect(mockPusherInstance.trigger).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        expect.objectContaining({
          string: 'thisIsAString',
          number: 12345,
        }),
      )
    })
  })

  describe('triggerArray', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('class-transformer will return serialised PipelineEntity', async () => {
      const pipeline = new PipelineEntity()
      pipeline.repository = {
        // @ts-ignore
        installationId: '12345',
        // @ts-ignore
        repositoryId: '12345',
      }
      await provider.triggerArray([{ channel: 'channel', name: 'event-name', data: pipeline }])

      expect(mockPusherInstance.triggerBatch).toHaveBeenCalledWith([
        expect.objectContaining({
          data: expect.objectContaining({
            repository: expect.objectContaining({
              installationId: 12345,
              repositoryId: 12345,
            }),
          }),
        }),
      ])
    })

    it('class-transformer will ignore objects', async () => {
      const obj = {
        string: 'thisIsAString',
        number: 12345,
        date: new Date(),
      }

      await provider.triggerArray([{ channel: 'channel', name: 'event-name', data: obj }])

      expect(mockPusherInstance.triggerBatch).toHaveBeenCalledWith([
        expect.objectContaining({
          data: expect.objectContaining({
            string: 'thisIsAString',
            number: 12345,
          }),
        }),
      ])
    })
  })
})
