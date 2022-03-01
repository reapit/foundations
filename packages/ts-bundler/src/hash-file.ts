import crypto from 'crypto'
import fs from 'fs'

export const generateHash = (fileContents: string) => {
  const hash = crypto.createHash('sha256')
  hash.update(fileContents)
  return hash.digest('hex')
}

export const generateHashFromFile = (absFileLoc: string) => {
  const fileContents = fs.readFileSync(absFileLoc, 'utf8')
  return generateHash(fileContents)
}
