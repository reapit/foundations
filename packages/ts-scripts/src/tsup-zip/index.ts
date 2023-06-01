import fs from 'fs'
import path from 'path'
import os from 'os'
import { execSync } from 'child_process'

// required for complex excluded packages in tsconfig
const packageDependencies = (folder: string, tmpDir: string) => {
  const pack = JSON.parse(fs.readFileSync(`../../node_modules/${folder}/package.json`, 'utf8'))

  execSync(`cp -r ${path.resolve(__dirname, '..', '..', '..', 'node_modules', folder)} ${tmpDir}/node_modules`)

  if (!pack.dependencies || !Object.keys(pack.dependencies)) return

  Object.keys(pack.dependencies).forEach((dep) => {
    console.log(`copying ${dep}...`)
    execSync(`cp -r ${path.resolve(__dirname, '..', '..', '..', 'node_modules', dep)} ${tmpDir}/node_modules`)
    packageDependencies(dep, tmpDir)
  })
}

const findConfig = () => {
  if (!fs.existsSync(path.resolve('tsup-zip.config.json'))) return {}

  return JSON.parse(fs.readFileSync(path.resolve('tsup-zip.config.json')).toString())
}

const bundle = (includes: string[], packageFolder: string) => {
  const tmpDir = fs.mkdtempSync([os.tmpdir(), `${packageFolder}-build-`].join(path.sep))
  const config = findConfig()

  fs.mkdirSync(`${tmpDir}/node_modules`)
  ;(config['bundle-packages'] || []).forEach((folder) => {
    packageDependencies(folder, tmpDir)
  })

  fs.mkdirSync(`${tmpDir}/packages`)
  fs.mkdirSync(`${tmpDir}/packages/${packageFolder}`)

  includes.forEach((folder) => {
    execSync(`cp -r ${path.resolve(process.cwd(), folder)} ${tmpDir}/packages/${packageFolder}/${folder}`)
  })

  execSync(`cd ${tmpDir} && zip -q -r ${path.resolve('bundle.zip')} .`)
}

const [folderPackage] = process.argv.slice(2)

bundle(['dist'], folderPackage)
