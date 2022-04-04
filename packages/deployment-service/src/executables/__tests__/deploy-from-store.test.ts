import { deleteCurrentLiveVersion, getFromVersionS3 } from '../deploy-from-store'
import { S3 } from 'aws-sdk'

jest.mock('../../services/s3', () => ({
  s3Client: {
    getObject: (params: S3.GetObjectRequest, func: (error?: string, data?: S3.GetObjectOutput) => void) => {
      if (params.Key === 'pipeline/success') {
        func(undefined, {
          Body: new Buffer(''),
        })
      }

      func('error')
    },
  },
  deleteObject: (params: S3.DeleteObjectRequest, func: (error?: string, data?: S3.DeleteObjectOutput) => void) => {
    if (params.Key === 'pipeline/success') {
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

describe('Deploy-From-Store', () => {
  describe('getFromVersionS3', () => {
    it('Can get from s3 successfully', async () => {
      const result = await getFromVersionS3('success')

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
      const result = await deleteCurrentLiveVersion('success')

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
})
