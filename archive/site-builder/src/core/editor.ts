/* istanbul ignore file */
import grapesjs from 'grapesjs'
import 'grapesjs-preset-webpage'
import { initializeComponents } from './initialize-components'

export interface EditorInitParams {
  identifier: string
}

export const initializeEditor = ({ identifier }: EditorInitParams) =>
  // Set timeout so init function gets called at the next tick when the container has loaded
  new Promise(resolve => {
    setTimeout(() => {
      resolve(
        grapesjs.init({
          container: `#${identifier.toLowerCase()}`,
          fromElement: true,
          width: '100%',
          height: '100%',
          canvas: {},
          plugins: [initializeComponents, 'gjs-preset-webpage', 'grapesjs-custom-code'],
          pluginsOpts: {
            'gjs-preset-webpage': {
              navbarOpts: false,
              countdownOpts: false,
              formsOpts: false,
              aviaryOpts: false,
              filestackOpts: false,
              blocksBasicOpts: {
                blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image' /*, 'video', 'map' */],
                flexGrid: true,
              },
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
        }),
      )
    }, 1)
  })
