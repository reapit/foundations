import { deployToLiveS3 } from '../deploy-to-live'
import { S3 } from 'aws-sdk'

const PREFIX = 'PREFIX'
const FILE_PATH = 'FILE_PATH'
const BUILD_LOCATION = 'BUILD_LOCATION'
const DEVELOPER_ID = 'developer_id'
const SUCCESS = 'success'
const PIPELINE_RUNNER_ID = 'PIPELINE_RUNNER_ID'

let mockResult = false

jest.mock('../../services/sts', () => ({
  getRoleCredentials: jest.fn(() => ({
    accessKeyId: 'test',
    secretAccessKey: 'test',
    sessionToken: 'test',
  })),
}))

jest.mock('../../services/s3', () => ({
  assumedS3Client: jest.fn(() => ({
    upload: jest.fn((params, func) => {
      mockResult = params
      params.FILE_PATH !== 'FAIL' ? func() : func('error')
    }),
    getObject: (params: S3.GetObjectRequest, func: (error?: string, data?: S3.GetObjectOutput) => void) => {
      if (params.Key === `pipeline/${DEVELOPER_ID}/${SUCCESS}/${PIPELINE_RUNNER_ID}.zip`) {
        func(undefined, {
          Body: new Buffer(''),
        })
      }

      func('error')
    },
    deleteObject: (params: S3.DeleteObjectRequest, func: (error?: string, data?: S3.DeleteObjectOutput) => void) => {
      if (params.Key === `pipeline/${DEVELOPER_ID}/${SUCCESS}/${PIPELINE_RUNNER_ID}.zip`) {
        func(undefined, {})
      }
      func('error')
    },
  })),
  s3Client: {
    upload: jest.fn((params, func) => {
      mockResult = params
      params.FILE_PATH !== 'FAIL' ? func() : func('error')
    }),
    getObject: (params: S3.GetObjectRequest, func: (error?: string, data?: S3.GetObjectOutput) => void) => {
      if (params.Key === `pipeline/${DEVELOPER_ID}/${SUCCESS}/${PIPELINE_RUNNER_ID}.zip`) {
        func(undefined, {
          Body: new Buffer(''),
        })
      }

      func('error')
    },
    deleteObject: (params: S3.DeleteObjectRequest, func: (error?: string, data?: S3.DeleteObjectOutput) => void) => {
      if (params.Key === `pipeline/${DEVELOPER_ID}/${SUCCESS}/${PIPELINE_RUNNER_ID}.zip`) {
        func(undefined, {})
      }
      func('error')
    },
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

    expect(mockResult).toBeTruthy()
  })
})
