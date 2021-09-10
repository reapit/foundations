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
  const entries = fs.readdirSync(dir)
  await Promise.all(
    entries.map((name) => {
      // [Promise<[Promise<[Promise<[] | void>] | void>] | void>] | void>... or Promise<void>
      const filePath = path.join(dir, name)
      const stat = fs.statSync(filePath)
      if (stat.isFile()) {
        return callback({ filePath, buildLocation, prefix, fileNameTransformer })
      } else if (stat.isDirectory()) {
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
