#!/usr/bin/env node
const ejs = require('ejs')
const path = require('path')
const { writeFileSync } = require('fs')
const { execSync, spawn } = require('child_process')
const { setEnv } = require('./get-env')
const formatCode = require('./format-code')

// since the build process executed in a parallel manner, folder of generated index file may not have been created
// have to create it first using mkdirp (mkdir with cursive)
const mkdirp = require('mkdirp')

const cjsIndexFolderPath = path.resolve(__dirname, '../../public/dist-npm/cjs')
const cjsIndexFilePath = path.resolve(cjsIndexFolderPath, './index.js')
const cjsIndexTemplateFilePath = path.resolve(__dirname, './tpls/index.cjs.ejs')

const esmIndexFolderPath = path.resolve(__dirname, '../../public/dist-npm/esm')
const esmIndexFilePath = path.resolve(esmIndexFolderPath, './index.js')
const esmIndexTemplateFilePath = path.resolve(__dirname, './tpls/index.esm.ejs')

const generateIndexFileForCjsPackages = async packages => {
  const compileResult = await ejs.renderFile(cjsIndexTemplateFilePath, {
    packages,
  })
  const formatResult = formatCode(compileResult)
  await mkdirp(cjsIndexFolderPath)
  await writeFileSync(cjsIndexFilePath, formatResult, { flag: 'w' })
}

const generateIndexFileForEsmPackages = async packages => {
  console.log('building index.js file for cjs packages')
  const compileResult = await ejs.renderFile(esmIndexTemplateFilePath, {
    packages,
  })
  const formatResult = formatCode(compileResult)
  await mkdirp(esmIndexFolderPath)
  await writeFileSync(esmIndexFilePath, formatResult, { flag: 'w' })
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
      exportName: 'ReapitViewingBookingComponent',
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

  promises.push([generateIndexFileForEsmPackages(packages), [generateIndexFileForCjsPackages(packages)]])

  await Promise.all(promises).catch(err => {
    console.error('There is an error while building: ')
    console.error(err)
    process.exit(1)
  })

  process.exit(0)
})()
