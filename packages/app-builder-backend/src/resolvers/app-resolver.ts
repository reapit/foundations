import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql'

import { App } from '../entities/app'
import { getUserApps, getApp, createApp, updateApp } from '../ddb'
import { Page } from '../entities/page'
import * as uuid from 'uuid'

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

  @Query(() => [App], { name: '_getUserApps' })
  async getUserApps(@Arg('userId') userId: string) {
    const apps = await getUserApps(userId)
    return apps
  }

  @Query(() => App, { nullable: true, name: '_getApp' })
  async getApp(@Arg('id') id: string) {
    return getApp(id)
  }

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
}
