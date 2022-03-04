import { createCustomEntity, updateCustomEntity } from '../custom-entites'
import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from 'type-graphql'

import { CustomEntity, CustomEntityInput } from '../entities/custom-entity'
import { Context } from '../types'

@Resolver(() => CustomEntity)
export class CustomEntityResolver {
  @Authorized()
  @Query(() => [CustomEntity], { name: '_getCustomEntities' })
  async getCustomEntities(@Ctx() ctx: Context): Promise<CustomEntity[]> {
    return ctx.customEntities
  }

  @Authorized()
  @Query(() => CustomEntity, { nullable: true, name: '_getCustomEntity' })
  async getCustomEntity(@Arg('id') id: string, @Ctx() context: Context): Promise<CustomEntity | undefined> {
    return context.customEntities.find((customEntity) => customEntity.id === id)
  }

  @Authorized()
  @Mutation(() => CustomEntity, { name: '_createCustomEntity' })
  async createCustomEntity(
    @Arg('customEntity', () => CustomEntityInput) customEntity: CustomEntityInput,
    @Ctx() context: Context,
  ): Promise<CustomEntity> {
    if (!context.appId) {
      throw new Error('AppId is missing')
    }
    return createCustomEntity(customEntity, context.appId, context.accessToken)
  }

  @Authorized()
  @Mutation(() => CustomEntity, { name: '_updateCustomEntity' })
  async updateCustomEntity(
    @Arg('id') id: string, // could be defined as an existing entity type
    @Arg('customEntity', () => CustomEntityInput) customEntity: CustomEntityInput,
    @Ctx() context: Context,
  ): Promise<CustomEntity> {
    if (!context.appId) {
      throw new Error('AppId is missing')
    }
    return updateCustomEntity(id, customEntity, context.appId)
  }
}
