import * as fs from "fs"

updatePackageVersion = async (package, version) => {
  const fileName = path.resolve(`packages/${package}`, 'package.json')
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
  app.on('release.released', async (event) => {
    const tag = event.release.tag
    const package = event.release.name
    if (!tag || !package) {
      return
    }
    
    await updatePackageVersion(package, tag)
  })
}
