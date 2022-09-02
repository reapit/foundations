import { DocumentNode } from 'graphql'
import { query } from '../utils/graphql-fetch'

type ApiResponse<Entity, Embeds> = Entity & {
  _embedded: Embeds
  _eTag: string
}

type ValueOf<T> = T[keyof T]

const hasEmbedded = (obj: any): obj is { _embedded: any } => {
  return !!obj._embedded
}

export abstract class AbstractCrudService<Entity, Embeds extends Record<string, any>, EntityInput> {
  constructor(
    private readonly getQuery: DocumentNode,
    private readonly getManyQuery: DocumentNode,
    private readonly updateEntityMutation: DocumentNode,
    private readonly createEntityMutation: DocumentNode,
    private readonly entityName: string,
  ) {}

  dateFields: string[] = ['created', 'modified']

  defaultEmbeds: { [s: string]: any } = {}

  getQueryName = () => `Get${this.entityName}ById`

  getManyQueryName = () => `Get${this.entityName}s`

  updateQueryName = () => `Update${this.entityName}`

  createQueryName = () => `Create${this.entityName}`

  getApiEntity({
    accessToken,
    idToken,
    id,
  }: {
    accessToken: string
    idToken: string
    id: string
  }): Promise<ApiResponse<Entity, Embeds> | null> {
    return query<ApiResponse<Entity, Embeds> | null>(this.getQuery, { id }, this.getQueryName(), {
      accessToken,
      idToken,
    })
  }

  async getEntity({
    id,
    accessToken,
    idToken,
  }: {
    id: string
    accessToken: string
    idToken: string
  }): Promise<Entity | null> {
    const entity = await this.getApiEntity({ id, accessToken, idToken })

    if (!entity) {
      return null
    }

    const hoistedEntity = this.hoistEmbeds(this.convertDates(entity))
    return this.addDefaultEmbeds(hoistedEntity)
  }

  async getEntities({
    idToken,
    accessToken,
    variables,
  }: {
    idToken: string
    accessToken: string
    variables?: any
  }): Promise<Entity[]> {
    const entities = await query<{ _embedded: ApiResponse<Entity, Embeds>[] }>(
      this.getManyQuery,
      {},
      this.getManyQueryName(),
      {
        idToken,
        accessToken,
        ...variables,
      },
    )

    return entities._embedded.map(this.convertDates).map(this.hoistEmbeds).map(this.addDefaultEmbeds)
  }

  async createEntity({
    accessToken,
    idToken,
    entityInput,
    variables,
  }: {
    accessToken: string
    idToken: string
    entityInput: EntityInput
    variables?: any
  }): Promise<Entity> {
    const result = await query<ApiResponse<null, null>>(
      this.createEntityMutation,
      entityInput as Record<string, any>,
      this.createQueryName(),
      { idToken, accessToken, ...variables },
    )

    const { id } = result

    const newEntity = await this.getEntity({
      id,
      accessToken,
      idToken,
    })

    if (!newEntity) {
      throw new Error(`${this.entityName} was not found for id [${id}]`)
    }

    return newEntity
  }

  async updateEntity({
    accessToken,
    idToken,
    id,
    entityInput,
    variables,
  }: {
    accessToken: string
    idToken: string
    id: string
    entityInput: EntityInput
    variables?: any
  }): Promise<Entity> {
    const existingEntity = await this.getEntity({
      id,
      idToken,
      accessToken,
    })

    if (!existingEntity) {
      throw new Error(`${this.entityName} with id [${id}] was not found`)
    }

    // @ts-ignore
    const { _eTag } = existingEntity

    await query<ApiResponse<null, null>>(
      this.updateEntityMutation,
      {
        ...entityInput,
        id,
        _eTag,
      },
      this.updateQueryName(),
      {
        idToken,
        accessToken,
        ...variables,
      },
    )

    const newEntity = await this.getEntity({
      id,
      idToken,
      accessToken,
    })

    if (!newEntity) {
      throw new Error(`${this.entityName} was not found`)
    }

    return newEntity
  }

  convertDates = (entity: (Entity & { _embedded: Embeds }) | ValueOf<Embeds>): Entity & { _embedded: Embeds } => {
    this.dateFields.forEach((dateField) => {
      if (entity[dateField]) entity[dateField] = new Date(entity[dateField])
    })

    const convertedEmbeds: Record<keyof Embeds, any> = {} as any
    if (hasEmbedded(entity)) {
      Object.keys(entity._embedded).forEach((embeddedField: keyof Embeds) => {
        if (entity._embedded[embeddedField]) {
          if (Array.isArray(entity._embedded[embeddedField])) {
            convertedEmbeds[embeddedField] = entity._embedded[embeddedField].map(this.convertDates)
          } else {
            convertedEmbeds[embeddedField] = this.convertDates(entity._embedded[embeddedField])
          }
        }
      })

      return { ...entity, _embedded: convertedEmbeds }
    }

    return entity
  }

  addDefaultEmbeds = (entity: Entity): Entity => {
    Object.entries(this.defaultEmbeds).forEach((value, index) => {
      entity[index] = value
    })

    return entity
  }

  hoistEmbeds = (object: Entity & { _embedded: any }): Entity & Embeds => {
    const { _embedded, ...rest } = object
    return { ...rest, ..._embedded }
  }
}
