import fs from 'fs'
import * as path from 'path'

export type recurseDirProps = {
  filePath: string
  buildLocation: string
  prefix: string
  fileNameTransformer?: (path: string) => string
}

export const recurseDir = async (
  {
    dir,
    prefix,
    buildLocation,
    fileNameTransformer,
  }: {
    dir: string
    prefix: string
    buildLocation: string
    fileNameTransformer?: (path: string) => string
  },
  callback: (props: recurseDirProps) => void | Promise<void>,
) => {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  await Promise.all(
    entries.map((dirent) => {
      // [Promise<[Promise<[Promise<[] | void>] | void>] | void>] | void>... or Promise<void>
      const filePath = path.join(dir, dirent.name)
      if (dirent.isFile()) {
        return callback({ filePath, buildLocation, prefix, fileNameTransformer })
      } else if (dirent.isDirectory()) {
        return recurseDir(
          {
            dir: filePath,
            prefix,
            buildLocation,
            fileNameTransformer,
          },
          callback,
        )
      }
    }),
  )
}
