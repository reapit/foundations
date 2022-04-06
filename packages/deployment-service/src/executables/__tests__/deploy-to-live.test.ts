import { s3Client } from '../../services'
import { deployToLiveS3 } from '../deploy-to-live'

const PREFIX = 'PREFIX'
const FILE_PATH = 'FILE_PATH'
const BUILD_LOCATION = 'BUILD_LOCATION'

jest.mock('../../services/s3', () => ({
  s3Client: {
    upload: jest.fn((params, func) => {
      params.FILE_PATH !== 'FAIL' ? func() : func('error')
    }),
  },
}))

jest.mock('../../services/github-app', () => ({
  githubApp: () => {
    return {}
  },
}))

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => {
    return new Buffer('')
  }),
}))

describe('deploy-to-live', () => {
  it('Can call s3 upload', async () => {
    await deployToLiveS3({
      filePath: `${BUILD_LOCATION}/${FILE_PATH}`,
      prefix: PREFIX,
      buildLocation: BUILD_LOCATION,
    })

    expect(s3Client.upload).toHaveBeenCalled()
  })
})
