import { PipelineEntity } from '../entities'
import { s3Client } from './../services'
import admZip from 'adm-zip'
import { cloneDir } from '../utils'
import fs from 'fs'

const zipper = new admZip()

export const storeVersion = async ({ pipeline }: { pipeline: PipelineEntity }): Promise<void> => {
  const storageLocation = `${pipeline.uniqueRepoName}/${pipeline.id}`

  console.log('store', `${cloneDir(pipeline)}/${pipeline.outDir || 'build'}`)
  console.log(
    fs.existsSync(`${cloneDir(pipeline)}/${pipeline.outDir || 'build'}`),
    fs.readdirSync(`${cloneDir(pipeline)}/${pipeline.outDir || 'build'}`),
  )

  zipper.addLocalFolder(`${cloneDir(pipeline)}/${pipeline.outDir || 'build'}`)

  await new Promise<void>((resolve, reject) =>
    s3Client.upload(
      {
        Bucket: process.env.DEPLOYMENT_BUCKET_NAME as string,
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
