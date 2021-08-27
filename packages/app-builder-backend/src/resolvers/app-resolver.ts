import { Resolver, Query, Arg, Mutation } from 'type-graphql'

import { App } from '../entities/app'
import { getUserApps, getApp, createApp } from '../ddb'

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
    const app = await createApp(name, userId)
    return app
  }
}
