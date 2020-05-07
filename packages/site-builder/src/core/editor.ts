import grapesjs from 'grapesjs'
import 'grapesjs-preset-webpage'
import { initializeComponents } from './initialize-components'

export interface EditorInitParams {
  identifier: string
}

export const initializeEditor = ({ identifier }: EditorInitParams) =>
  grapesjs.init({
    container: `#${identifier}`,
    fromElement: true,
    width: '100%',
    height: '100%',
    canvas: {},
    plugins: [initializeComponents, 'gjs-preset-webpage'],
    pluginsOpts: {
      'gjs-preset-webpage': {
        navbarOpts: false,
        countdownOpts: false,
        formsOpts: false,
        aviaryOpts: false,
        filestackOpts: false,
        blocksBasicOpts: false,
        blocks: [],
      },
    },
    storageManager: {
      id: `reapit-site-builder-${identifier}`,
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
