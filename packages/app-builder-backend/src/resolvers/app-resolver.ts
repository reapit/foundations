import { Resolver, Query, Arg, Mutation, ID, Authorized, Ctx } from 'type-graphql'

import { App } from '../entities/app'
import { getApp, createApp, updateApp, getDomainApps, getUnqDomain, DDBApp } from '../ddb'
import { Page } from '../entities/page'
import { ejectApp } from '../eject'
import { Context } from '../types'
import {
  createMarketplaceApp,
  createMarketplaceAppRevision,
  getDeveloperApps,
  getMarketplaceApp,
} from '../platform/apps'
import { notEmpty } from '../utils/helpers'

export const defaultNodes = [
  {
    nodeId: 'ROOT',
    type: { resolvedName: 'Container' },
    isCanvas: true,
    props: { width: 12, background: 'white', padding: 40 },
    displayName: 'Container',
    custom: { displayName: 'App' },
    // @ts-ignore until they update their types
    parent: null,
    hidden: false,
    nodes: ['tPwDk5SDAg'],
    linkedNodes: {},
  },
  {
    nodeId: 'tPwDk5SDAg',
    type: { resolvedName: 'Text' },
    isCanvas: false,
    props: { fontSize: 12, width: 12, text: "I'm here by default!" },
    displayName: 'Text',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
]

const getAppUrl = (apiUrl: string, subdomain: string) => {
  const url = new URL(apiUrl)
  url.hostname = `${subdomain}.${url.hostname}`
  url.protocol = 'https:'
  return url.toString()
}

enum Access {
  read = 'read',
  write = 'write',
}

const getObjectScopes = (objectName: string, access: Access) => {
  return `agencyCloud/${objectName.toLowerCase()}.${access}`
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

const ensureScopes = (app: DDBApp, accessToken: string) => {
  const nodes = app.pages.map((page) => page.nodes).flat()
  const requiredAccess: { objectName: string; access: Access[] }[] = nodes
    .map((node) => {
      const name = node.type.resolvedName
      const objectName = node.props.typeName as string
      if (name === 'Form') {
        return {
          objectName,
          access: [Access.read, Access.write],
        }
      }
      if (name === 'Table') {
        return {
          objectName,
          access: node.props.showControls ? [Access.read, Access.write] : [Access.write],
        }
      }
      return null
    })
    .filter(notEmpty)

  const scopes = requiredAccess
    .map(({ objectName, access }) => {
      return access.map((access) => getObjectScopes(objectName, access))
    })
    .flat()

  return updateMarketplaceAppScopes(app.id, scopes, accessToken)
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
      apps?.map(async ({ id, externalId, name }) => {
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
        }
      }),
    )

    return appBuilderApps.filter(notEmpty)
  }

  @Query(() => App, { nullable: true, name: '_getApp' })
  async getApp(@Arg('idOrSubdomain') idOrSubdomain: string, @Ctx() context: Context): Promise<App> {
    const app = (await getApp(idOrSubdomain)) || (await getDomainApps(idOrSubdomain))[0]
    if (app) {
      const { externalId, name } = await getMarketplaceApp(app.id, context.accessToken)
      return {
        ...app,
        name: name as string,
        clientId: externalId as string,
      }
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
    const appUrl = getAppUrl(context.apiUrl, subdomain)
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
    const app = await createApp(id, name, subdomain, [
      {
        id: '~',
        name: 'Home',
        nodes: defaultNodes.map((node) => ({
          ...node,
          id: `${id}~${node.nodeId}`,
        })),
      },
    ])
    const { externalId } = await getMarketplaceApp(id, context.accessToken)
    if (!externalId) {
      throw new Error('Failed to create app - no clientId created')
    }

    return {
      ...app,
      name: name as string,
      clientId: externalId as string,
    }
  }

  @Authorized()
  @Mutation(() => App, { name: '_updateApp' })
  async updateApp(
    @Ctx() context: Context,
    @Arg('id', () => ID) id: string,
    @Arg('pages', () => [Page], { nullable: true }) pages?: Array<Page>,
  ): Promise<App> {
    const app = await getApp(id)
    if (!app) {
      throw new Error('App not found')
    }
    if (pages) {
      app.pages = pages
    }
    await ensureScopes(app, context.accessToken)
    const newApp = await updateApp(app)

    const { externalId, name } = await getMarketplaceApp(id, context.accessToken)
    return {
      ...newApp,
      name: name as string,
      clientId: externalId as string,
    }
  }

  @Authorized()
  @Mutation(() => String, { name: '_ejectApp' })
  async ejectApp(@Arg('id', () => ID) id: string, @Ctx() ctx: Context) {
    const app = await getApp(id)
    if (!app) {
      throw new Error('App not found')
    }
    const { externalId, name } = await getMarketplaceApp(id, ctx.accessToken)
    return ejectApp(
      {
        ...app,
        name: name as string,
        clientId: externalId as string,
      },
      ctx,
    )
  }
}
