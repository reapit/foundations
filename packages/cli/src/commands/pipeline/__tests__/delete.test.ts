import { LoginService } from '../../../services'
import axios from 'axios'
import Pusher, { ConnectionManager } from 'pusher-js'
import { DeletePipelineCommand } from '../delete'

jest.mock('open', () => 9000)

jest.mock('../../../utils/config', () => ({
  ...jest.requireActual('../../../utils/config'),
  resolveConfig: jest.fn(() =>
    Promise.resolve({
      from: 'test',
      config: {
        'api-key': 'test-test-test-test',
      },
    }),
  ),
}))

jest.mock('fs', () => ({
  existsSync: () => true,
  promises: {
    readFile: jest.fn(() =>
      Promise.resolve(
        JSON.stringify({
          id: 'PIPELINE_ID',
        }),
      ),
    ),
  },
}))

jest.mock('inquirer', () => ({
  prompt: jest.fn(() => ({
    recreate: true,
    appType: 'react',
  })),
}))

jest.mock('axios')
jest.mock('pusher-js')

DeletePipelineCommand.prototype.confirmation = jest.fn(() => Promise.resolve())

describe('pipeline-delete', () => {
  it('Can delete pipeline', async () => {
    // @ts-ignore
    jest.spyOn(process, 'exit').mockImplementation(() => {})

    // @ts-ignore
    Pusher.prototype.subscribe = jest.fn(() => ({
      subscribe: jest.fn(),
      bind: jest.fn((event, callback) => {
        setTimeout(() => {
          callback({
            id: 'pipeline-runner-id',
            buildStatus: 'READY_FOR_DEPLOYMENT',
          })
        }, 200)
      }),
    }))
    // @ts-ignore
    Pusher.prototype.connection = {
      bind: jest.fn((key, callback) => {
        setTimeout(() => {
          callback({
            current: 'connected',
          })
        }, 200)

        return {} as ConnectionManager
      }),
    }

    //@ts-ignore
    axios.create.mockImplementation(() => axios)
    // @ts-ignore
    axios.delete = jest.fn(() => ({
      status: 204,
    }))

    const command = new DeletePipelineCommand(true, new LoginService)

    await command.run()

    expect(axios.delete).toHaveBeenCalled()
  })
})
