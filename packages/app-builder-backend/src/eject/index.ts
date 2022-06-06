import fse from 'fs-extra'
import path from 'path'
import JSZip from 'jszip'

import { Node, Page } from '../entities/page'
import { App } from '../entities/app'
import { Pages } from './types'

import { generatePage } from './templates/page'
import { generateRoutes } from './templates/routes'
import { generateApp } from './templates/app'
import { generateIndex } from './templates'
import { generateIndexHtml } from './templates/indexHtml'
import { generatePackageJson } from './templates/packageJson'
import { generateTsconfigJson } from './templates/tsconfigJson'
import { generateEslintrc } from './templates/eslintrc'
import { generatePrivateRouterWrapper } from './templates/private-router-wrapper'
import { generateSession } from './templates/session'
import { Context } from '../types'
import { notEmpty } from '../utils/helpers'

const propsToAttributes = (props: Object) =>
  Object.keys(props)
    .map((key) => `${key}={${JSON.stringify(props[key])}}`)
    .join(' ')

const nodeToString = (node: Node, allNodes: Array<Node>) => {
  const { type, props, nodes } = node
  if (node.nodeId === 'ROOT') {
    props.isRoot = true
  }
  const attributes = propsToAttributes(props)
  const children = nodes
    .map((nodeId) => {
      const node = allNodes.find((n) => n.nodeId === nodeId)
      if (!node) {
        throw new Error(`No node found for id ${nodeId}`)
      }
      return nodeToString(node, allNodes)
    })
    .join('\n')

  return children.length
    ? `<${type.resolvedName} ${attributes}>${children}</${type.resolvedName}>`
    : `<${type.resolvedName} ${attributes} />`
}

const nodeDoesntContainerSelf = (node: Node): Node => ({
  ...node,
  nodes: node.nodes.filter((n) => n !== node.nodeId),
})

export const mergeHeaderFooterIntoPage = (nodes: Node[], header: Node[] = [], footer: Node[] = []): Node[] => {
  const rootNode = nodes.find((n) => n.nodeId === 'ROOT')
  if (!rootNode) {
    throw new Error('unable to find root node')
  }

  const bodyNode = nodes.find((n) => n.nodeId === 'body') || {
    ...rootNode,
    nodes: rootNode.nodes.filter((node) => node !== 'header' && node !== 'footer' && node !== 'body'),
    id: `${rootNode.id}-body`,
    nodeId: 'body',
  }

  return [
    ...header,
    nodeDoesntContainerSelf(bodyNode),
    ...nodes
      .filter((node) => node.nodeId !== 'ROOT')
      .map((node) => ({
        ...node,
        parent: node.parent === 'ROOT' ? 'body' : node.parent,
      })),
    ...footer,
    {
      ...rootNode,
      nodes: [header.length ? 'header' : undefined, 'body', footer.length ? 'footer' : undefined].filter(notEmpty),
    },
  ]
}

const pageToString = (page: Page, header: Node[], footer: Node[]) => {
  const nodes = mergeHeaderFooterIntoPage(page.nodes, header, footer)
  const rootNode = nodes.find((node) => node.nodeId === 'ROOT')
  if (!rootNode) {
    throw new Error(`No root node found for page ${page.id}`)
  }
  const jsx = nodeToString(rootNode, nodes)
  const components = [
    ...new Set(
      nodes
        .filter((node) => {
          const firstLetter = node.type.resolvedName[0]
          return firstLetter.toUpperCase() === firstLetter
        })
        .map((node) => node.type.resolvedName),
    ),
  ]

  return {
    jsx,
    components,
  }
}

const generatePages = (app: App): Promise<Pages> =>
  Promise.all(
    app.pages.map(async (page) => {
      const { jsx, components } = pageToString(page, app.header, app.footer)
      return {
        id: page.id,
        name: page.name,
        text: await generatePage(page.id, jsx, components),
        components,
        fileLoc: `src/pages/${page.id === '~' ? 'index' : page.id}.tsx`,
      }
    }),
  )

const getFiles = async (dir: string, exclude: Array<string> = []) => {
  // get all files in folder
  const files = await fse.readdir(dir)
  // filter out files that are not .ts(x)
  const tsxFiles = files.filter((file) => (file.endsWith('.tsx') || file.endsWith('.ts')) && !exclude.includes(file))
  // map to file paths
  const filePaths = tsxFiles.map((file) => `${dir}/${file}`)
  // map to file contents
  const fileContents = await Promise.all(filePaths.map((file) => fse.readFile(file, 'utf8')))
  // map to file objects
  const filesObjects = filePaths.map((filePath, index) => ({
    fileLoc: filePath,
    text: fileContents[index],
  }))
  return filesObjects
}

const getComponentsAndHooks = async () => {
  const appBuilderDir = path.resolve(require.resolve('@reapit/app-builder'), '..', '..')
  const components = await getFiles(`${appBuilderDir}/src/components/ui/user/ejectable`)
  const hooks = (
    await Promise.all([
      getFiles(`${appBuilderDir}/src/components/hooks`),
      getFiles(`${appBuilderDir}/src/components/hooks/apps`, [
        'emptyState.ts',
        'use-create-app.ts',
        'node-helpers.ts',
        'use-update-app.ts',
      ]),
      getFiles(`${appBuilderDir}/src/components/hooks/objects`),
      getFiles(`${appBuilderDir}/src/components/hooks/use-introspection`),
    ])
  ).flat()

  return [...components, ...hooks].map((file) => ({
    fileLoc: file.fileLoc
      .replace(`${appBuilderDir}/`, '') // remove app-builder root
      .replace('ui/user/ejectable/', '') // move components to src/components
      .replace('components/hooks', 'hooks'), // move hooks to src/hooks
    text: file.text
      .replaceAll('../../../hooks', '../hooks') // replace relative path to hooks
      .replaceAll("import { styled } from '@linaria/react'", "import styled from 'styled-components'"),
  }))
}

const zipFiles = async (files: Array<{ fileLoc: string; text: string }>) => {
  const zip = new JSZip()
  files.forEach((file) => {
    zip.file(file.fileLoc, file.text)
  })
  return zip.generateAsync({
    type: 'base64',
  })
}

export const ejectApp = async (app: App, context: Context) => {
  const pages = await generatePages(app)
  const routesText = await generateRoutes(pages)
  const appFile = {
    fileLoc: 'src/app.tsx',
    text: await generateApp({ apiUrl: context.apiUrl }),
  }

  const routesFile = {
    text: routesText,
    fileLoc: 'src/router.tsx',
  }
  const indexFile = {
    text: await generateIndex(),
    fileLoc: 'src/index.tsx',
  }
  const indexHtml = {
    text: generateIndexHtml(),
    fileLoc: 'public/index.html',
  }
  const packageJson = {
    text: generatePackageJson(app.name),
    fileLoc: 'package.json',
  }
  const tsConfigJson = {
    text: generateTsconfigJson(),
    fileLoc: 'tsconfig.json',
  }
  const eslintRc = {
    text: generateEslintrc(),
    fileLoc: '.eslintrc',
  }

  const privateRouterWrapper = {
    text: await generatePrivateRouterWrapper(),
    fileLoc: 'src/private-router-wrapper.tsx',
  }
  const session = {
    text: await generateSession(),
    fileLoc: 'src/session.ts',
  }

  const componentsAndHooks = await getComponentsAndHooks()

  const files = [
    routesFile,
    ...pages,
    ...componentsAndHooks,
    privateRouterWrapper,
    session,
    appFile,
    indexFile,
    indexHtml,
    packageJson,
    tsConfigJson,
    eslintRc,
  ]

  return zipFiles(files)
}
