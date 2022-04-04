import { deleteCurrentLiveVersion, deployFromStore, getFromVersionS3 } from '../deploy-from-store'
import { S3 } from 'aws-sdk'
import * as release from '../release-to-live'
import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'
import { plainToClass } from 'class-transformer'
import { InvalidPipelineResourcesException } from '../../exceptions'

const DEVELOPER_ID = 'developer_id'
const SUCCESS = 'success'
const PIPELINE_RUNNER_ID = 'PIPELINE_RUNNER_ID'

jest.mock('../../services/s3', () => ({
  s3Client: {
    getObject: (params: S3.GetObjectRequest, func: (error?: string, data?: S3.GetObjectOutput) => void) => {
      if (params.Key === `pipeline/${DEVELOPER_ID}/${SUCCESS}/${PIPELINE_RUNNER_ID}.zip`) {
        func(undefined, {
          Body: new Buffer(''),
        })
      }

      func('error')
    },
  },
  deleteObject: (params: S3.DeleteObjectRequest, func: (error?: string, data?: S3.DeleteObjectOutput) => void) => {
    if (params.Key === `pipeline/${DEVELOPER_ID}/${SUCCESS}/${PIPELINE_RUNNER_ID}.zip`) {
      func(undefined, {})
    }
    func('error')
  },
}))

jest.mock('../../services/github-app', () => ({
  githubApp: () => {
    return {}
  },
}))

jest.mock('./../release-to-live', () => ({
  releaseToLiveFromZip: jest.fn(() => {
    return Promise.resolve()
  }),
}))

jest.mock('@aws-sdk/client-cloudfront', () => ({
  CreateInvalidationCommand: class {},
  CloudFrontClient: class {
    send() {
      return Promise.resolve()
    }
  },
}))

describe('Deploy-From-Store', () => {
  describe('getFromVersionS3', () => {
    it('Can get from s3 successfully', async () => {
      const result = await getFromVersionS3(`${DEVELOPER_ID}/${SUCCESS}/${PIPELINE_RUNNER_ID}.zip`)

      expect(result.Body).toBeInstanceOf(Buffer)
    })

    it('Can throw error', async () => {
      try {
        await getFromVersionS3('')
      } catch (e) {
        expect(e).toBe('error')
      }
    })
  })

  describe('deleteCurrentLiveVersion', () => {
    it('Can delete object', async () => {
      const result = await deleteCurrentLiveVersion(`${DEVELOPER_ID}/${SUCCESS}/${PIPELINE_RUNNER_ID}.zip`)

      expect(result).toBeUndefined()
    })

    it('Can catch error', async () => {
      try {
        await deleteCurrentLiveVersion('')
      } catch (e) {
        expect(e).toBeTruthy()
      }
    })
  })

  it('deploy-from-store sucess', async () => {
    const pipeline = plainToClass(PipelineEntity, {
      name: '',
      developerId: DEVELOPER_ID,
      subDomain: SUCCESS,
      cloudFrontId: 'cloudfront_id',
    })
    const sendFn = (CloudFrontClient.prototype.send = jest.fn())

    await deployFromStore({
      pipeline,
      pipelineRunner: {
        pipeline,
        id: PIPELINE_RUNNER_ID,
      } as PipelineRunnerEntity,
    })

    expect(release.releaseToLiveFromZip).toHaveBeenCalled()
    expect(sendFn).toHaveBeenCalled()
  })

  it('deploy-from-store fail on cloudFrontId', async () => {
    const pipeline = plainToClass(PipelineEntity, {
      name: '',
      developerId: DEVELOPER_ID,
      subDomain: SUCCESS,
    })

    try {
      await deployFromStore({
        pipeline,
        pipelineRunner: {
          pipeline,
          id: PIPELINE_RUNNER_ID,
        } as PipelineRunnerEntity,
      })
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPipelineResourcesException)
    }
  })
})
