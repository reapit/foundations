import * as React from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs-preset-webpage'
import { FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { blockSearchWidget } from '../blocks/block-search-widget'

const initEditor = () => {
  const editor = grapesjs.init({
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

  editor.DomComponents.addType('search-widget', {
    model: {
      defaults: {
        testprop: 1,
        traits: [
          // Strings are automatically converted to text types
          'name', // Same as: { type: 'text', name: 'name' }
          'placeholder',
          {
            type: 'select', // Type of the trait
            label: 'Type', // The label you will see in Settings
            name: 'type', // The name of the attribute/property to use on component
            options: [
              { id: 'text', name: 'Text' },
              { id: 'email', name: 'Email' },
              { id: 'password', name: 'Password' },
              { id: 'number', name: 'Number' },
            ],
          },
          {
            type: 'checkbox',
            name: 'required',
          },
        ],
      },
      init() {
        console.log('Local hook: model.init')
        ;(this as any).listenTo(this, 'change:testprop', this.handlePropChange)
        // Here we can listen global hooks with editor.on('...')
      },
      updated(property, value, prevValue) {
        console.log('Local hook: model.updated', 'property', property, 'value', value, 'prevValue', prevValue)
      },
      removed() {
        console.log('Local hook: model.removed')
      },
      handlePropChange() {
        console.log('The value of testprop', (this as any).get('testprop'))
      },
    },
    view: {
      init() {
        console.log('Local hook: view.init')
      },
      onRender() {
        console.log('Local hook: view.onRender')
      },
    },
  })

  editor.BlockManager.add('search-widget', blockSearchWidget)

  editor.DomComponents.addType('test-component', {
    model: {
      defaults: {
        testprop: 1,
        traits: [
          // Strings are automatically converted to text types
          'name', // Same as: { type: 'text', name: 'name' }
          'placeholder',
          {
            type: 'select', // Type of the trait
            label: 'Type', // The label you will see in Settings
            name: 'type', // The name of the attribute/property to use on component
            options: [
              { id: 'text', name: 'Text' },
              { id: 'email', name: 'Email' },
              { id: 'password', name: 'Password' },
              { id: 'number', name: 'Number' },
            ],
          },
          {
            type: 'checkbox',
            name: 'required',
          },
        ],
      },
      init() {
        console.log('Local hook: model.init')
        ;(this as any).listenTo(this, 'change:testprop', this.handlePropChange)
        // Here we can listen global hooks with editor.on('...')
      },
      updated(property, value, prevValue) {
        console.log('Local hook: model.updated', 'property', property, 'value', value, 'prevValue', prevValue)
      },
      removed() {
        console.log('Local hook: model.removed')
      },
      handlePropChange() {
        console.log('The value of testprop', (this as any).get('testprop'))
      },
    },
    view: {
      init() {
        console.log('Local hook: view.init')
      },
      onRender() {
        console.log('Local hook: view.onRender')
      },
    },
  })

  // A block for the custom component
  editor.BlockManager.add('test-component', {
    label: 'Test Component',
    content: '<div data-gjs-type="test-component">Test Component</div>',
  })

  editor.on('component:create', model => console.log('Global hook: component:create', model.get('type')))
  editor.on('component:mount', model => console.log('Global hook: component:mount', model.get('type')))
  editor.on('component:update:testprop', model =>
    console.log('Global hook: component:update:testprop', model.get('type')),
  )
  editor.on('component:remove', model => console.log('Global hook: component:remove', model.get('type')))
}

export const Authenticated: React.FunctionComponent = () => {
  const [hasLoadedEditor, setHasLoadedEditor] = React.useState(false)

  if (!hasLoadedEditor) {
    setTimeout(() => {
      initEditor()
      setHasLoadedEditor(true)
    }, 1)
  }

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasBackground>
        <div id="gjs"></div>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default Authenticated
