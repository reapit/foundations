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

  await fs.promises.writeFile(fileName, JSON.stringify(workingPackage, null, 2))
}

export default (app) => {
  console.log('hello, am instanced')
  // app.onAny(event => console.log('event', event))
  app.onAny(async (event) => {
    console.log('event triggered')
    const [packageLocation, tag] = event.payload.release.name.split('_v')
    console.log('tag', tag, 'loc', packageLocation)
    if (!tag || !packageLocation) {
      return
    }

    console.log('info', tag, packageLocation)
    
    await updatePackageVersion(packageLocation.replace('@reapit/', ''), tag)
  })
}
