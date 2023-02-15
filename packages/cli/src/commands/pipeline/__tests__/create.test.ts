import { LoginService } from '../../../services'
import axios from 'axios'
import Pusher, { ConnectionManager } from 'pusher-js'
import { PipelineCreate } from '../create'

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
  writeFileSync: jest.fn(),
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

describe('pipeline-create', () => {
  it('Can create pipeline', async () => {
    //@ts-ignore
    axios.create.mockImplementation(() => axios)
    // @ts-ignore
    axios.post = jest.fn(() => ({
      status: 201,
      data: {
        name: 'name',
        developerId: 'DEVELOPER_ID',
      },
    }))
    // @ts-ignore
    Pusher.prototype.subscribe = jest.fn(() => ({
      subscribe: jest.fn(),
      bind: jest.fn((event, callback) => {
        setTimeout(() => {
          callback({
            id: 'pipeline-runner-id',
            buildStatus: 'READY_FOR_DEPLOYMENT',
          })
        }, 201)
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

    const command = new PipelineCreate(true, new LoginService)

    await command.run()

    expect(axios.post).toHaveBeenCalled()
  })
})
