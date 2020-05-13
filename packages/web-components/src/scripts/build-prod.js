#!/usr/bin/env node
const ejs = require('ejs')
const path = require('path')
const { writeFileSync } = require('fs')
const { execSync, spawn } = require('child_process')
const { setEnv } = require('./get-env')
const minifyCode = require('./minify-code')

// since the build process is executed in a parallel manner, folder of generated index files may not have been created
// have to create it first using mkdirp (mkdir with cursive)
const mkdirp = require('mkdirp')

const cjsIndexFolderPath = path.resolve(__dirname, '../../public/dist-npm/cjs')
const cjsIndexFilePath = path.resolve(cjsIndexFolderPath, './index.js')
const cjsIndexTemplateFilePath = path.resolve(__dirname, './tpls/index.cjs.ejs')

const esmIndexFolderPath = path.resolve(__dirname, '../../public/dist-npm/esm')
const esmIndexFilePath = path.resolve(esmIndexFolderPath, './index.js')
const esmIndexTemplateFilePath = path.resolve(__dirname, './tpls/index.esm.ejs')

const tsDeclarationIndexFolderPath = path.resolve(__dirname, '../../public/dist-npm/types')
const tsDeclarationIndexFilePath = path.resolve(tsDeclarationIndexFolderPath, './index.d.ts')
const tsDeclarationIndexTemplateFilePath = path.resolve(__dirname, './tpls/index.d.ts.ejs')

const generateFileForPackages = async ({ packages, tplPath, destinationFilePath, destinationFolderPath, formatFn }) => {
  const compileResult = await ejs.renderFile(tplPath, {
    packages,
  })

  const formatResult = formatFn ? await formatFn(compileResult) : compileResult

  await mkdirp(destinationFolderPath)
  console.log(`created ${destinationFilePath}`)
  await writeFileSync(destinationFilePath, formatResult, { flag: 'w' })
}

return (async () => {
  const packages = [
    {
      webpackPackageName: 'search-widget',
      exportName: 'ReapitSearchWidgetComponent',
    },
    {
      webpackPackageName: 'appointment-bookings',
      exportName: 'ReapitAppointmentBookingComponent',
    },
    {
      webpackPackageName: 'viewing-booking',
      exportName: 'ReapitViewingBookingComponent',
    },
    {
      webpackPackageName: 'themes',
    },
    {
      webpackPackageName: 'property-detail',
      exportName: 'ReapitPropertyDetailComponent',
    },
  ]
  const opts = {
    stdio: 'inherit',
  }
  setEnv()

  const clearPublic = 'rimraf ./public/dist-npm && rimraf ./public/dist && rimraf ./public/themes'
  execSync(clearPublic, opts)

  const promises = packages.map(({ webpackPackageName }) => {
    const buildPackageFn = () =>
      new Promise((resolve, reject) => {
        {
          const clientBuildScriptPath = `./src/scripts/rollup.config.${webpackPackageName}.js`
          const spawnObject = spawn('rollup', ['-c', clientBuildScriptPath], {
            stdio: 'inherit',
          })
          spawnObject.on('error', err => reject(err))
          spawnObject.on('exit', resolve)
        }
      })

    return buildPackageFn()
  })

  promises.push(
    generateFileForPackages({
      packages,
      tplPath: cjsIndexTemplateFilePath,
      destinationFilePath: cjsIndexFilePath,
      destinationFolderPath: cjsIndexFolderPath,
      formatFn: minifyCode,
    }),
    generateFileForPackages({
      packages,
      tplPath: esmIndexTemplateFilePath,
      destinationFilePath: esmIndexFilePath,
      destinationFolderPath: esmIndexFolderPath,
      formatFn: minifyCode,
    }),
    generateFileForPackages({
      packages,
      tplPath: tsDeclarationIndexTemplateFilePath,
      destinationFilePath: tsDeclarationIndexFilePath,
      destinationFolderPath: tsDeclarationIndexFolderPath,
      formatFn: minifyCode,
    }),
  )

  try {
    await Promise.all(promises)
  } catch (err) {
    console.error('There is an error while building: ')
    console.error(err)
    process.exit(1)
  }

  process.exit(0)
})()
