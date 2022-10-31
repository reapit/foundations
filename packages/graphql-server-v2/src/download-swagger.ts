import fs from 'fs'
import { resolve } from 'path'
import 'isomorphic-fetch'

const download = async () => {
  const { PLATFORM_API_BASE_URL } = process.env
  const dest = resolve(__dirname, '..', 'swagger.json')

  console.log('Fetching swagger from platform')
  const response = await fetch(`${PLATFORM_API_BASE_URL}/docs/swagger/agencyCloud_swagger.json`)

  const body = await response.json()

  console.log('Writting to ', dest)
  fs.writeFileSync(dest, JSON.stringify(body), 'utf8')
}

download()
