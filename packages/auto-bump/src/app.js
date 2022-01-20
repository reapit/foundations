import * as fs from "fs"
import * as path from 'path'

const updatePackageVersion = async (location, version) => {
  const fileName = path.resolve(`packages/${location}`, 'package.json')
  const workingPackageRaw = await fs.promises.readFile(fileName, {
    encoding: 'utf-8',
  })
  if (!workingPackageRaw) {
    spinner.fail('Working package.json not found. Please run in a javascript application')
    process.exit(1)
  }

  const workingPackage = JSON.parse(workingPackageRaw)
  workingPackage.version = version

  await fs.promises.writeFile(fileName, `${JSON.stringify(workingPackage, null, 2)}\n`)
}

export default (app) => {
  app.onAny(async (event) => {
    const [packageLocation, tag] = event.payload.release.name.split('_v')
    if (!tag || !packageLocation) {
      return
    }
    
    await updatePackageVersion(packageLocation.replace('@reapit/', ''), tag)
  })
}
