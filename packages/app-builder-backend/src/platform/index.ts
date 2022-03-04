import {
  CreateSchemaRequest,
  MetadataModel,
  MetadataModelPagedResult,
  SchemaModel,
  SchemaModelPagedResult,
  UpdateSchemaRequest,
} from '@reapit/foundations-ts-definitions/types'
import fetch from 'node-fetch'
import config from '../config.json'

const { platformApiUrl } = config

export { SchemaModel } from '@reapit/foundations-ts-definitions/types'

export const getMetadataObject = async (
  id: string,
  accessToken: string,
): Promise<{ [key: string]: any; id: string } | undefined> => {
  const res = await fetch(`${platformApiUrl}/metadata/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  if (res.status !== 200) {
    return
  }

  const data = (await res.json()) as MetadataModel

  return {
    ...data.metadata,
    id,
  }
}

export const deleteMetadataObject = async (id: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/metadata/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  if (res.status !== 200) {
    return
  }

  const data = (await res.json()) as MetadataModel

  return data.metadata
}

export const findMetadataObject = async (entityType: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/metadata?entityType=${entityType}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  const data = (await res.json()) as MetadataModelPagedResult

  return data._embedded || []
}

export const updateMetadataObject = async (id: string, metadata: any, accessToken: string) => {
  await fetch(`${platformApiUrl}/metadata/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'api-version': '2020-01-31',
    },
    body: JSON.stringify({ metadata }),
  })
  return getMetadataObject(id, accessToken)
}

export const getMetadataSchemas = async (accessToken: string): Promise<SchemaModel[]> => {
  const res = await fetch(`${platformApiUrl}/metadata/metadataSchema`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  const data = (await res.json()) as SchemaModelPagedResult
  if (res.status !== 200) {
    throw new Error(`Failed to get metadata schemas: ${res.status}`)
  }
  return data._embedded || []
}

export const getMetadataSchema = async (id: string, accessToken: string): Promise<SchemaModel> => {
  const res = await fetch(`${platformApiUrl}/metadata/metadataSchema/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  const data = (await res.json()) as SchemaModel
  if (res.status !== 200) {
    throw new Error(`Failed to get metadata schema with id "${id}": ${res.status}`)
  }
  return data
}

export const createMetadataObject = async (entityType: string, metadata: any, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/metadata`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'api-version': '2020-01-31',
    },
    body: JSON.stringify({ entityType, metadata }),
  })
  if (res.status > 300) {
    throw new Error(`Failed to create ${entityType}`)
  }
  const newUrl = res.headers.get('location')

  const id = newUrl?.split('/').pop()

  if (!id) {
    throw new Error(`Failed to get id from ${newUrl}`)
  }

  return getMetadataObject(id, accessToken)
}

export const createMetadataSchema = async (schema: CreateSchemaRequest, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/metadata/metadataSchema`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'api-version': '2020-01-31',
    },
    redirect: 'follow',
    body: JSON.stringify(schema),
  })
  if (res.status >= 400) {
    throw new Error(`Failed to create metadata schema: ${res.status}`)
  }
  const parts = res.headers.get('location')?.split('/') || []
  const id = parts[parts.length - 1]
  return getMetadataSchema(id, accessToken)
}

export const updateMetadataSchema = async (id: string, schema: UpdateSchemaRequest, accessToken: string) => {
  await fetch(`${platformApiUrl}/metadata/metadataSchema/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'api-version': '2020-01-31',
    },
    redirect: 'follow',
    body: JSON.stringify(schema),
  })
  return getMetadataSchema(id, accessToken)
}

const ENTITY_ID = 'dataType'

export const ensureDataEntityType = async (name: string, accessToken: string) => {
  const entityType = `${ENTITY_ID}${name}`.toLowerCase()
  const type = await getMetadataSchema(entityType, accessToken)
  const dataSchema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties: {
      data: {
        type: 'string',
      },
    },
  }
  if (type) {
    return entityType
  }

  await createMetadataSchema(
    {
      entityType,
      schema: JSON.stringify(dataSchema),
    },
    accessToken,
  )

  return entityType
}

type DataEntity = {
  id: string
  data: Array<any>
}

export const getDataEntity = async (name: string, accessToken: string): Promise<DataEntity> => {
  const entityType = await ensureDataEntityType(name, accessToken)
  const [existing] = await findMetadataObject(entityType, accessToken)
  if (existing) {
    return {
      id: existing.id as string,
      data: existing.metadata?.data,
    }
  }
  const data = []
  const obj = await createMetadataObject(entityType, { data }, accessToken)
  return {
    id: obj?.id as string,
    data,
  }
}

export const setDataEntity = async (name: string, data: Array<any>, accessToken: string) => {
  const entity = await getDataEntity(name, accessToken)
  if (!entity) {
    await createMetadataObject(name, { data }, accessToken)
    return data
  }
  await updateMetadataObject(entity.id, { data }, accessToken)
  return data
}
