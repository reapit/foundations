import { BitBucketEvent } from '../../bitbucket-webhook'
import { BitbucketClientData } from '../../../entities/bitbucket-client.entity'
import { PipelineRunnerEntity } from '../../../entities/pipeline-runner.entity'
import { PipelineEntity } from '../../../entities/pipeline.entity'
import { codebuildExecutor, downloadBitbucketSourceToS3, downloadGithubSourceToS3 } from '../codebuild-executor'
import { SQSRecord, Context } from 'aws-lambda'
import { savePipelineRunnerEntity, sqs } from '../../../services'
// import { PackageManagerEnum } from "../../../dto"

const DATA_LOCATION_STRING = 'DATA_LOCATION_STRING'
const GITHUB_INSTALLATION_ID = 12456

jest.mock('../../../services/bitbucket', () => ({
  getBitBucketToken: jest.fn(() =>
    Promise.resolve({
      access_token: '',
    }),
  ),
}))

jest.mock('node-fetch', () =>
  jest.fn(() =>
    Promise.resolve({
      status: 200,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(10)),
    }),
  ),
)

jest.mock('../../../services/sqs', () => ({
  sqs: {
    upload: jest.fn((params, callback) => {
      callback()
    }),
    deleteMessage: jest.fn((params, callback) => callback()),
  },
}))

jest.mock('../../../services/pipeline-runner', () => ({
  savePipelineRunnerEntity: jest.fn((obj) => Promise.resolve(obj)),
  updatePipelineRunnerEntity: jest.fn((obj, rep) =>
    Promise.resolve({
      ...obj,
      ...rep,
    }),
  ),
}))

jest.mock('../../../services/github-app', () => ({
  githubApp: {
    getInstallationOctokit: () => {
      return Promise.resolve({
        request: () =>
          Promise.resolve({
            data: new ArrayBuffer(10),
          }),
      })
    },
  },
}))

jest.mock('../../../services/s3', () => ({
  s3Client: {
    upload: (params, callback) =>
      callback(undefined, {
        Key: DATA_LOCATION_STRING,
      }),
    getSignedUrlPromise: () => Promise.resolve('s3-url'),
  },
}))

jest.mock('aws-sdk', () => ({
  CodeBuild: class {
    startBuild = jest.fn(() => {
      return {
        send: jest.fn((callback) =>
          callback(undefined, {
            build: {
              id: 'codebuild-id',
            },
          }),
        ),
      }
    })
  },
}))

describe('codebuild-executor', () => {
  it('downloadBitbucketSourceToS3', async () => {
    const result = await downloadBitbucketSourceToS3({
      pipeline: {
        repository: 'https://bitbucket.org/username/repo',
      } as PipelineEntity,
      pipelineRunner: {
        id: 'pipeline-runner-id',
      } as PipelineRunnerEntity,
      client: {
        key: 'key',
        clientKey: 'clientKey',
      } as BitbucketClientData,
      event: {
        data: {
          repository: {
            is_private: true,
          },
        },
      } as BitBucketEvent,
    })

    expect(result).toBe(`/${DATA_LOCATION_STRING}`)
  })

  it('downloadGithubSourceToS3', async () => {
    const result = await downloadGithubSourceToS3(
      {
        repository: 'https://github.com/username/repo',
        installationId: GITHUB_INSTALLATION_ID,
      } as PipelineEntity,
      {
        id: 'pipeline-runner-id',
      } as PipelineRunnerEntity,
    )

    expect(result).toBe(`/${DATA_LOCATION_STRING}`)
  })

  it('codebuild executor', async () => {
    await codebuildExecutor(
      {
        Records: [
          {
            body: JSON.stringify({
              pipelineRunner: {
                id: 'pipeline-runner-id',
                pipeline: {
                  // packageManager: PackageManagerEnum.YARN,
                  buildCommand: 'build',
                  outDir: 'build',
                  name: 'test',
                  id: 'pipeline-id',
                  repository: 'https://github.com/username/repo',
                  installationId: GITHUB_INSTALLATION_ID,
                },
              },
            }),
            receiptHandle: '',
          } as SQSRecord,
        ],
      },
      {} as Context,
      () => {},
    )

    expect(savePipelineRunnerEntity).toHaveBeenCalled()
    // @ts-ignore
    expect(savePipelineRunnerEntity.mock.calls[0][0].tasks.map((task) => task.functionName)).toStrictEqual([
      'INSTALL',
      'BUILD',
      'DOWNLOAD_SOURCE',
      'DEPLOY',
    ])
    expect(sqs.deleteMessage).toHaveBeenCalled()
  })
})
