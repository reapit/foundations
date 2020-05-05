import grapesjs from 'grapesjs'
import 'grapesjs-preset-webpage'

export const editor = grapesjs.init({
  container: '#gjs',
  fromElement: true,
  width: '100%',
  height: '100%',
  canvas: {},
  plugins: ['gjs-preset-webpage'],
  pluginsOpts: {
    'gjs-preset-webpage': {},
  },
  storageManager: {
    id: 'reapit-site-builder-',
    type: 'local',
    autosave: true,
    autoload: true,
    stepsBeforeSave: 1,
    storeComponents: true,
    storeStyles: true,
    storeHtml: true,
    storeCss: true,
  },
})
