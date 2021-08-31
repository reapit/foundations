import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql'

import { App } from '../entities/app'
import { getUserApps, getApp, createApp, updateApp } from '../ddb'
import { Page } from '../entities/page'

@Resolver(() => App)
export class AppResolver {
  constructor() {}

  @Query(() => [App], { name: '_getUserApps' })
  async getUserApps(@Arg('userId') userId: string) {
    return getUserApps(userId)
  }

  @Query(() => App, { nullable: true, name: '_getApp' })
  async getApp(@Arg('id') id: string) {
    return getApp(id)
  }

  @Mutation(() => App, { name: '_createApp' })
  async createApp(@Arg('name') name: string, @Arg('userId') userId: string) {
    const app = await createApp(userId, name)
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
