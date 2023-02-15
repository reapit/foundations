import { LoginService } from '../../services'
import axios from 'axios'
import { CheckVersionCommand } from '../check-version'

jest.mock('../../utils/config', () => ({
  ...jest.requireActual('../../utils/config'),
  resolveConfig: jest.fn(() =>
    Promise.resolve({
      from: 'test',
      config: {
        'api-key': 'test-test-test-test',
      },
    }),
  ),
}))

jest.mock('../../../package.json', () => ({
  version: '2.0.0',
}))
jest.mock('axios')
jest.mock('open', () => 9000)

describe('check-version', () => {
  let checkVersionCommand: CheckVersionCommand

  beforeAll(() => {
    checkVersionCommand = new CheckVersionCommand(true, new LoginService())
  })

  it('Can inform of newer version', async () => {
    // @ts-ignore
    axios.create.mockImplementation(() => axios)
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: {
        'dist-tags': ['2.0.0', '3.0.0'],
      },
      status: 200,
    })
    console.log = jest.fn()

    await checkVersionCommand.run()

    expect(console.log).toHaveBeenCalledTimes(4)
  })

  it('Not inform of no changes', async () => {
    //@ts-ignore
    axios.create.mockImplementation(() => axios)
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: {
        'dist-tags': ['2.0.0', '1.9.20'],
      },
      status: 200,
    })
    console.log = jest.fn()

    await checkVersionCommand.run()

    expect(console.log).not.toHaveBeenCalled()
  })
})
