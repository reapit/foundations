import { LoginService } from '@/services'
import axios from 'axios'
import { PipelineEditCommand } from '../edit'

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

jest.mock('../../../utils/config', () => ({
  resolveConfig: jest.fn(() =>
    Promise.resolve({
      from: 'test',
      config: {
        'api-key': 'test-test-test-test',
      },
    }),
  ),
}))

jest.mock('inquirer', () => ({
  prompt: jest.fn(() => ({
    recreate: true,
    appType: 'react',
  })),
}))

jest.mock('axios')
jest.mock('pusher-js')

describe('pipeline-edit', () => {
  it('Can edit pipeline', async () => {
    // @ts-ignore
    jest.spyOn(process, 'exit').mockImplementation(() => {})
    //@ts-ignore
    axios.create.mockImplementation(() => axios)
    // @ts-ignore
    axios.put = jest.fn(() => ({
      status: 200,
      data: {
        name: 'name',
        developerId: 'DEVELOPER_ID',
      },
    }))

    const command = new PipelineEditCommand(true, new LoginService)

    await command.run()

    expect(axios.put).toHaveBeenCalled()
  })
})
