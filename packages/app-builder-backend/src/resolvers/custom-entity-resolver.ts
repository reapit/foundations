import { CreateSchemaRequest } from '@reapit/foundations-ts-definitions/types'
import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from 'type-graphql'

import { CustomEntity, CustomEntityInput } from '../entities/custom-entity'
import {
  createMetadataSchema,
  getMetadataSchema,
  getMetadataSchemas,
  SchemaModel,
  updateMetadataSchema,
} from '../platform'
import { Context } from '../types'

export const PLACEHOLDER = '_placeholder'

const metadataSchemaToCustomEntity = (metadataSchema: SchemaModel): CustomEntity => {
  if (!metadataSchema.schema) {
    throw new Error('Metadata schema is missing schema')
  }
  if (!metadataSchema.id) {
    throw new Error('Metadata schema is missing id')
  }

  const schema = JSON.parse(metadataSchema.schema)

  return {
    id: metadataSchema.id,
    name: metadataSchema.id,
    fields: Object.keys(schema.properties)
      .filter((fieldName) => fieldName !== PLACEHOLDER)
      .map((fieldName) => ({
        id: fieldName,
        name: fieldName,
        type: schema.properties[fieldName].type,
      })),
  }
}
const customEntityToMetadataSchema = (customEntity: CustomEntity): CreateSchemaRequest => {
  if (!customEntity.id) {
    throw new Error('Custom entity is missing id')
  }
  if (!customEntity.name) {
    throw new Error('Custom entity is missing name')
  }
  if (!customEntity.fields) {
    throw new Error('Custom entity is missing fields')
  }

  const schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties: {
      // needed so it's not empty
      [PLACEHOLDER]: {
        type: 'string',
      },
    },
  }

  customEntity.fields.forEach((field) => {
    schema.properties[field.id] = {
      type: field.type,
    }
  })

  return {
    entityType: customEntity.id,
    schema: JSON.stringify(schema),
  }
}

@Resolver(() => CustomEntity)
export class CustomEntityResolver {
  @Authorized()
  @Query(() => [CustomEntity], { name: '_getCustomEntities' })
  async getCustomEntities(@Ctx() ctx: Context): Promise<CustomEntity[]> {
    const schemas = await getMetadataSchemas(ctx.accessToken)

    return schemas.map(metadataSchemaToCustomEntity)
  }

  @Authorized()
  @Query(() => CustomEntity, { nullable: true, name: '_getCustomEntity' })
  async getCustomEntity(@Arg('id') id: string, @Ctx() context: Context): Promise<CustomEntity | undefined> {
    const schema = await getMetadataSchema(id, context.accessToken)

    return metadataSchemaToCustomEntity(schema)
  }

  @Authorized()
  @Mutation(() => CustomEntity, { name: '_createCustomEntity' })
  async createCustomEntity(
    @Arg('customEntity', () => CustomEntityInput) customEntity: CustomEntityInput,
    @Ctx() context: Context,
  ): Promise<CustomEntity> {
    const result = await createMetadataSchema(customEntityToMetadataSchema(customEntity), context.accessToken)
    return metadataSchemaToCustomEntity(result)
  }

  @Authorized()
  @Mutation(() => CustomEntity, { name: '_updateCustomEntity' })
  async updateCustomEntity(
    @Arg('id') id: string,
    @Arg('customEntity', () => CustomEntityInput) customEntity: CustomEntityInput,
    @Ctx() context: Context,
  ): Promise<CustomEntity> {
    const result = await updateMetadataSchema(id, customEntityToMetadataSchema(customEntity), context.accessToken)
    return metadataSchemaToCustomEntity(result)
  }
}
