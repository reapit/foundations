import fs from 'fs'
import * as path from 'path'

export type recurseDirProps = {
  filePath: string,
  buildLocation: string,
  prefix: string,
}

export const recurseDir = async (
  {
    dir,
    prefix,
    buildLocation,
  }: {
    dir: string
    prefix: string
    buildLocation: string
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
        return callback({ filePath, buildLocation, prefix })
      } else if (stat.isDirectory()) {
        return recurseDir(
          {
            dir: filePath,
            prefix,
            buildLocation,
          },
          callback,
        )
      }
    }),
  )
}
