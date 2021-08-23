import fetch from 'node-fetch'
import config from '../config.json'

const { platformApiUrl } = config

export const getMetadataObject = async (id: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/metadata/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  const data = await res.json()
  console.log('get', data)
  if (data.statusCode !== 200) {
    return
  }
  return data.metadata
}

export const findMetadataObject = async (entityType: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/metadata?entityType=${entityType}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  const data = await res.json()
  console.log('find', data)
  return data._embedded
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

export const createMetadataObject = async (entityType: string, metadata: any, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/metadata`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'api-version': '2020-01-31',
    },
    redirect: 'follow',
    body: JSON.stringify({ entityType, metadata }),
  })
  const data = await res.json()
  console.log('create', data)
  return data.metadata
}

export const getSchema = async (id: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/metadata/metadataSchema/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  const data = await res.json()
  console.log('getSchema', data)
  return data
}

export const createSchema = async (schema: { entityType: string; schema: string }, accessToken: string) => {
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
  const parts = res.headers.get('location')?.split('/') || []
  const id = parts[parts.length - 1]
  return getSchema(id, accessToken)
}

const ENTITY_ID = 'dataType'

export const ensureDataEntityType = async (name: string, accessToken: string) => {
  const entityType = `${ENTITY_ID}${name}`.toLowerCase()
  const type = await getSchema(entityType, accessToken)
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

  await createSchema(
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
      id: existing.id,
      data: existing.metadata.data,
    }
  }
  const data = []
  const { id } = await createMetadataObject(entityType, { data }, accessToken)
  return {
    id,
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
