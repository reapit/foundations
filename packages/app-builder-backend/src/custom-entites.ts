import { getApp, updateApp } from './ddb'
import { CustomEntity, CustomEntityInput } from './entities/custom-entity'
import { isIdEntityType } from './utils/extract-metadata'
import { createMetadataSchema } from './platform'

export const getCustomEntities = async (appId: string): Promise<CustomEntity[]> => {
  const app = await getApp(appId)
  return app?.customEntities ?? []
}

export const createCustomEntity = async (
  customEntity: CustomEntityInput,
  appId: string,
  accessToken: string,
): Promise<CustomEntity> => {
  const app = await getApp(appId)
  if (!app) {
    throw new Error(`App ${appId} not found`)
  }
  const customEntities = app.customEntities ?? []
  const newCustomEntity = {
    ...customEntity,
    id: `${customEntities.length + 1}`,
  }
  customEntities.push(newCustomEntity)
  await updateApp({ ...app, customEntities, id: appId })
  if (!isIdEntityType(customEntity.id)) {
    const dataSchema = {
      $schema: 'http://json-schema.org/draft-04/schema#',
      type: 'object',
      properties: {
        appBuilderData: {
          type: 'string',
        },
      },
    }
    await createMetadataSchema(
      {
        entityType: customEntity.id,
        schema: JSON.stringify(dataSchema),
      },
      accessToken,
    )
  }
  return newCustomEntity
}

export const updateCustomEntity = async (
  id: string,
  customEntity: CustomEntityInput,
  appId: string,
): Promise<CustomEntity> => {
  const app = await getApp(appId)
  if (!app) {
    throw new Error(`App ${appId} not found`)
  }
  const customEntities = app.customEntities ?? []
  const updatedCustomEntity = {
    ...customEntities.find((customEntity) => customEntity.id === id),
    ...customEntity,
  }
  const index = customEntities.findIndex((customEntity) => customEntity.id === id)
  customEntities.splice(index, 1, updatedCustomEntity)
  await updateApp({ ...app, customEntities, id: appId })
  return updatedCustomEntity
}
