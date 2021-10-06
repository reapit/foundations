import { Resolver, Query, Arg, Mutation, ID, Authorized } from 'type-graphql'

import { App } from '../entities/app'
import { getUserApps, getApp, createApp, updateApp, getDomainApps } from '../ddb'
import { Page } from '../entities/page'
import * as uuid from 'uuid'
import { ejectApp } from '../eject'

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

@Resolver(() => App)
export class AppResolver {
  constructor() {}

  @Authorized()
  @Query(() => [App], { name: '_getUserApps' })
  async getUserApps(@Arg('userId') userId: string) {
    const apps = await getUserApps(userId)
    return apps
  }

  @Query(() => App, { nullable: true, name: '_getApp' })
  async getApp(@Arg('idOrSubdomain') idOrSubdomain: string) {
    const app = await getApp(idOrSubdomain)
    if (app) {
      return app
    }
    const apps = await getDomainApps(idOrSubdomain)
    if (apps.length) {
      return apps[0]
    }
    throw new Error(`App ${idOrSubdomain} not found`)
  }

  @Authorized()
  @Mutation(() => App, { name: '_createApp' })
  async createApp(@Arg('name') name: string, @Arg('userId') userId: string) {
    const id = uuid.v4()
    const app = await createApp(id, userId, name, [
      {
        id: '~',
        name: 'Home',
        nodes: defaultNodes.map((node) => ({
          ...node,
          id: `${id}~${node.nodeId}`,
        })),
      },
    ])
    return app
  }

  @Authorized()
  @Mutation(() => App, { name: '_updateApp' })
  async updateApp(
    @Arg('id', () => ID) id: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('pages', () => [Page], { nullable: true }) pages?: Array<Page>,
  ) {
    const app = await getApp(id)
    if (!app) {
      throw new Error('App not found')
    }
    if (name) {
      app.name = name
    }
    if (pages) {
      app.pages = pages
    }
    return updateApp(app)
  }

  @Authorized()
  @Mutation(() => String, { name: '_ejectApp' })
  async ejectApp(@Arg('id', () => ID) id: string) {
    const app = await getApp(id)
    if (!app) {
      throw new Error('App not found')
    }
    return ejectApp(app)
  }
}
