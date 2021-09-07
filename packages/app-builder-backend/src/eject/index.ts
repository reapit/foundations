import fse from 'fs-extra'
import path from 'path'

import { Node, Page } from '../entities/page'
import { App } from '../entities/app'
import { generatePage } from './templates/page'
import { Pages } from './types'
import { generateRoutes } from './templates/routes'

const propsToAttributes = (props: Record<string, any>) =>
  Object.keys(props)
    .map((key) => `${key}={${JSON.stringify(props[key])}}`)
    .join(' ')

const nodeToString = (node: Node, allNodes: Array<Node>) => {
  const { type, props, nodes } = node
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

const pageToString = (page: Page) => {
  const rootNode = page.nodes.find((node) => node.nodeId === 'ROOT')
  if (!rootNode) {
    throw new Error(`No root node found for page ${page.id}`)
  }
  const jsx = nodeToString(rootNode, page.nodes)
  const components = page.nodes
    .filter((node) => {
      const firstLetter = node.type.resolvedName[0]
      return firstLetter.toUpperCase() === firstLetter
    })
    .map((node) => node.type.resolvedName)

  return {
    jsx,
    components,
  }
}

const generatePages = (app: App): Promise<Pages> =>
  Promise.all(
    app.pages.map(async (page) => {
      const { jsx, components } = pageToString(page)
      return {
        id: page.id,
        name: page.name,
        text: await generatePage(page.id, jsx, components),
        components,
        fileLoc: `src/pages/${page.id === '~' ? 'index' : page.id}.tsx`,
      }
    }),
  )

const getFiles = async (dir: string) => {
  // get all files in folder
  const files = await fse.readdir(dir)
  // filter out files that are not .ts(x)
  const tsxFiles = files.filter((file) => file.endsWith('.tsx') || file.endsWith('.ts'))
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
      getFiles(`${appBuilderDir}/src/components/hooks/apps`),
      getFiles(`${appBuilderDir}/src/components/hooks/objects`),
      getFiles(`${appBuilderDir}/src/components/hooks/use-introspection`),
    ])
  ).flat()

  return [...components, ...hooks].map((file) => ({
    fileLoc: file.fileLoc.replace(`${appBuilderDir}/`, ''),
    text: file.text,
  }))
}

export const ejectApp = async (app: App) => {
  const pages = await generatePages(app)
  const routesText = await generateRoutes(pages)

  const routesFile = {
    text: routesText,
    fileLoc: 'src/routes.ts',
  }

  const componentsAndHooks = await getComponentsAndHooks()

  return [routesFile, ...pages, ...componentsAndHooks]
}
