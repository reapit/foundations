import { PipelineEntity } from '../entities'
import { cloneDir } from '../utils'
import { s3Client } from './../services'
import admZip from 'adm-zip'

const zipper = new admZip()

export const storeVersion = async ({ pipeline }: { pipeline: PipelineEntity }): Promise<void> => {
  const location = pipeline.uniqueRepoName
  const storageLocation = `${pipeline.uniqueRepoName}/${pipeline.id}`

  zipper.addLocalFolder(location, 'build')

  await new Promise<void>((resolve, reject) =>
    s3Client.upload(
      {
        Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
        Key: `${storageLocation}.zip`,
        Body: zipper.toBuffer(),
      },
      (error) => {
        if (error) {
          console.error(error)
          reject(error)
        }

        resolve()
      },
    ),
  )
}
