import { Resolver, Query, Arg, Mutation, ID, Authorized, Ctx, FieldResolver, Root } from 'type-graphql'
import Pluralize from 'pluralize'

import { App } from '../entities/app'
import { getApp, createApp, updateApp, getDomainApps, getUnqDomain, DDBApp } from '../ddb'
import { Page, Node } from '../entities/page'
import { ejectApp } from '../eject'
import { Context } from '../types'
import {
  createMarketplaceApp,
  createMarketplaceAppRevision,
  getDeveloperApps,
  getMarketplaceApp,
  getValidMarketplaceScopes,
} from '../platform/apps'
import { notEmpty } from '../utils/helpers'
import slugify from 'slugify'

export const defaultNodes = [
  {
    nodeId: 'ROOT',
    type: { resolvedName: 'Container' },
    isCanvas: true,
    props: { width: 12, background: 'white', padding: 40 },
    displayName: 'Container',
    custom: { displayName: 'App' },
    parent: null,
    hidden: false,
    nodes: ['tPwDk5SDAg'],
    linkedNodes: {},
  },
  {
    nodeId: 'tPwDk5SDAg',
    type: { resolvedName: 'Text' },
    isCanvas: false,
    props: { fontSize: 12, width: 12, text: 'Type text here' },
    displayName: 'Text',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
]

const getAppUrl = (webUrl: string, subdomain: string) => {
  const url = new URL(webUrl)
  url.hostname = `${subdomain}.${url.hostname}`
  url.protocol = 'https:'
  // remove trailing slash
  return url.toString().replace(/\/$/, '')
}

enum Access {
  read = 'read',
  write = 'write',
}

const getObjectScopes = (objectName: string, access: Access) => {
  let on = objectName
  if (on.toLowerCase() === 'propertyimage') {
    on = 'image'
  }
  return `agencyCloud/${Pluralize.plural(on)}.${access}`
}

// compare array of strings
const compareArrays = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false
  }
  return a.every((item) => b.includes(item))
}

// remove empty strings from object
const removeEmpty = (obj: any) => {
  const copy = { ...obj }
  Object.keys(copy).forEach((key) => {
    if (copy[key] === '') {
      delete copy[key]
    }
  })
  return copy
}

const updateMarketplaceAppScopes = async (appId: string, scopes: string[], accessToken: string) => {
  const marketplaceApp = await getMarketplaceApp(appId, accessToken)
  const existingScopes = marketplaceApp.scopes?.map(({ name }) => name).filter(notEmpty) || []
  if (!compareArrays(existingScopes, scopes)) {
    const appRevision = removeEmpty({
      ...marketplaceApp,
      scopes,
    })
    return createMarketplaceAppRevision(appId, appRevision, accessToken)
  }
}

const updateMarketplaceAppName = async (appId: string, name: string, accessToken: string) => {
  const marketplaceApp = await getMarketplaceApp(appId, accessToken)
  if (marketplaceApp.name !== name) {
    const appRevision = removeEmpty({
      ...marketplaceApp,
      name,
    })
    return createMarketplaceAppRevision(appId, appRevision, accessToken)
  }
}

const isArray = (obj: any): obj is string[] => Array.isArray(obj)
const isString = (obj: any): obj is string => typeof obj === 'string'

const ensureScopes = async (app: DDBApp, accessToken: string) => {
  const nodes = app.pages.map((page) => page.nodes).flat()
  const validScopes = (await getValidMarketplaceScopes(accessToken)).map(({ name }) => name)
  const acEntities = [...new Set(validScopes.map((scope) => scope?.split('/')[1].split('.')[0]))].filter(notEmpty)
  const requiredAccess: { objectName: string; access: Access[] }[] = nodes
    .map((node) => {
      const name = node.type.resolvedName
      const props = node.props
      const objectName = node.props?.typeName as string | undefined

      if (!objectName || !props) {
        return null
      }

      const fieldNames =
        name === 'Form'
          ? node.nodes
              .map((nodeId) => nodes.find(({ nodeId: id }) => id === nodeId))
              .filter(notEmpty)
              .map((node) => node.props.name)
              .filter(notEmpty)
              .filter(isString)
          : isArray(props.includedFields)
          ? props.includedFields
          : []

      const subtypes = fieldNames
        .map((name) => name.replace('Ids', '').replace('Id', ''))
        .map((name) => {
          if (name.endsWith('y')) {
            return name.replace(/y$/, 'ies')
          }
          return name
        })
        .map((name) => {
          if (name.toLowerCase().includes('attendee')) {
            return 'contact'
          }
          return name
        })
        .filter((fieldName) => acEntities.find((entityName) => entityName.includes(fieldName)))

      const scopes = [
        {
          objectName,
          access: props.showControls || name === 'Form' ? [Access.read, Access.write] : [Access.read],
        },
        ...subtypes.map((subtype) => ({
          objectName: subtype,
          access: [Access.read],
        })),
      ]

      if (objectName.toLowerCase() === 'propertyimage') {
        scopes.push({
          objectName: 'properties',
          access: [Access.read, Access.write],
        })
      }

      return scopes
    })
    .flat()
    .filter(notEmpty)
  const scopes = requiredAccess
    .map(({ objectName, access }) => {
      return access.map((access) => getObjectScopes(objectName, access))
    })
    .flat()
    .filter(notEmpty)
    .filter((scope) => validScopes.includes(scope))
  // unique scopes
  const uniqueScopes = [...new Set(scopes)]

  return updateMarketplaceAppScopes(app.id, uniqueScopes, accessToken)
}

@Resolver(() => App)
export class AppResolver {
  constructor() {}

  @Authorized()
  @Query(() => [App], { name: '_getUserApps' })
  async getUserApps(@Arg('developerId') developerId: string, @Ctx() ctx: Context): Promise<App[]> {
    const apps = await getDeveloperApps(developerId, ctx.accessToken)
    if (!apps) {
      return []
    }
    const appBuilderApps = await Promise.all(
      apps.map(async ({ id, externalId, name, developer }) => {
        if (!id) {
          return undefined
        }
        const appBuilderApp = await getApp(id)
        if (!appBuilderApp) {
          return undefined
        }
        return {
          ...appBuilderApp,
          name: name as string,
          clientId: externalId as string,
          developerName: developer as string,
        }
      }),
    )

    return appBuilderApps.filter(notEmpty)
  }

  @Query(() => App, { nullable: true, name: '_getApp' })
  async getApp(@Arg('idOrSubdomain') idOrSubdomain: string): Promise<App> {
    const app = (await getApp(idOrSubdomain)) || (await getDomainApps(idOrSubdomain))[0]
    if (app) {
      return app
    }
    throw new Error(`App ${idOrSubdomain} not found`)
  }

  @Authorized()
  @Mutation(() => App, { name: '_createApp' })
  async createApp(
    @Arg('name') name: string,
    @Arg('developerId') developerId: string,
    @Ctx() context: Context,
  ): Promise<App> {
    const subdomain = await getUnqDomain()
    const appUrl = getAppUrl(context.webUrl, subdomain)
    const id = await createMarketplaceApp(
      {
        name,
        developerId,
        authFlow: 'authorisationCode',
        isDirectApi: true,
        redirectUris: [appUrl],
        scopes: [],
        signoutUris: [appUrl],
      },
      context.accessToken,
    )
    const app = await createApp(id, name, subdomain, [])
    const { externalId, developer } = await context.getMarketplaceApp(app.id)
    if (!externalId) {
      throw new Error('Failed to create app - no clientId created')
    }

    await updateApp({
      ...app,
      clientId: externalId as string,
      developerName: developer,
    })

    return {
      ...app,
      name: name as string,
      clientId: externalId as string,
      developerName: developer,
    }
  }

  @Authorized()
  @Mutation(() => App, { name: '_updateAppName' })
  async updateAppName(
    @Ctx() context: Context,
    @Arg('id', () => ID) id: string,
    @Arg('name') name: string,
  ): Promise<App> {
    const app = await getApp(id)
    if (!app) {
      throw new Error('App not found')
    }
    await updateMarketplaceAppName(id, name, context.accessToken)
    // new name will get resolved by field resolver
    return app
  }

  @Authorized()
  @Query(() => [Node], { name: '_getAppPageNodes' })
  async getPageNodes(@Arg('appId', () => ID) appId: string, @Arg('pageId', () => ID) pageId: string): Promise<Node[]> {
    const app = await getApp(appId)
    if (!app) {
      throw new Error('App not found')
    }
    const page = app.pages.find((page) => page.id === pageId)
    if (!page) {
      throw new Error('Page not found')
    }
    return page.nodes
  }

  @Authorized()
  @Mutation(() => Page, { name: '_updateAppPageName' })
  async updatePageName(
    @Arg('appId', () => ID) appId: string,
    @Arg('pageId', () => ID) pageId: string,
    @Arg('pageName', () => String) pageName: string,
  ): Promise<Page> {
    const app = await getApp(appId)
    if (!app) {
      throw new Error('App not found')
    }
    const existingPage = app.pages.find((page) => page.id === pageId)
    if (!existingPage) {
      throw new Error('Page not found')
    }
    const newPage = { ...existingPage, name: pageName }
    app.pages = app.pages.map((p) => {
      return p.id === pageId ? newPage : p
    })
    await updateApp(app)
    return newPage
  }

  @Authorized()
  @Mutation(() => [Node], { name: '_updateAppPageNodes' })
  async updatePageNodes(
    @Ctx() context: Context,
    @Arg('appId', () => ID) appId: string,
    @Arg('pageId', () => ID) pageId: string,
    @Arg('nodes', () => [Node]) nodes: Node[],
  ): Promise<Node[]> {
    const app = await getApp(appId)
    if (!app) {
      throw new Error('App not found')
    }
    const existingPage = app.pages.find((page) => page.id === pageId)
    if (!existingPage) {
      throw new Error('Page not found')
    }
    const newPage = { ...existingPage, nodes }
    app.pages = app.pages.map((p) => {
      return p.id === pageId ? newPage : p
    })
    await updateApp(app)
    await ensureScopes(app, context.accessToken)
    return nodes
  }

  @Authorized()
  @Mutation(() => App, { name: '_createAppPage' })
  async createPage(
    @Arg('appId', () => ID) appId: string,
    @Arg('name', () => String) name: string,
    @Arg('entityName') entityName: string,
    @Arg('pageType') pageType: 'create' | 'update' | 'list',
  ): Promise<App> {
    const app = await getApp(appId)
    if (!app) {
      throw new Error('App not found')
    }
    const pageId = slugify(name)
    if (app.pages.find((page) => page.id === pageId)) {
      throw new Error('Page already exists')
    }
    const page = {
      id: pageId,
      name,
      nodes: defaultNodes.map((node) => ({
        ...node,
        id: `${pageId}~${node.nodeId}`,
      })),
      entityName,
      pageType,
    }
    app.pages.push(page)
    const newApp = await updateApp(app)
    return newApp
  }

  @Authorized()
  @Mutation(() => App, { name: '_deleteAppPage' })
  async deletePage(@Arg('appId', () => ID) appId: string, @Arg('pageId', () => ID) pageId: string): Promise<App> {
    const app = await getApp(appId)
    if (!app) {
      throw new Error('App not found')
    }
    app.pages = app.pages.filter((p) => p.id !== pageId)
    const newApp = await updateApp(app)
    return newApp
  }

  @FieldResolver()
  async name(@Root() app: App, @Ctx() ctx: Context) {
    if (!ctx.accessToken) {
      return null
    }
    const { name } = await ctx.getMarketplaceApp(app.id)
    return name
  }

  @Authorized()
  @Mutation(() => String, { name: '_ejectApp' })
  async ejectApp(@Arg('id', () => ID) id: string, @Ctx() ctx: Context) {
    const app = await getApp(id)
    if (!app) {
      throw new Error('App not found')
    }
    const { externalId, name, developer } = await ctx.getMarketplaceApp(app.id)
    return ejectApp(
      {
        ...app,
        name: name as string,
        clientId: externalId as string,
        developerName: developer as string,
      },
      ctx,
    )
  }
}
