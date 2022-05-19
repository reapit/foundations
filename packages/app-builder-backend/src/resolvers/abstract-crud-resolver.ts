import { DocumentNode } from 'graphql'
import { query } from '../utils/graphql-fetch'

type ApiResponse<Entity, Embeds> = Entity & {
  _embedded: Embeds
  _eTag: string
}

export abstract class AbstractCrudService<Entity, Embeds extends any, EntityInput> {
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

    const hoistedEntity = this.hoistEmbeds(entity)
    return this.convertDates(this.addDefaultEmbeds(hoistedEntity))
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

    return entities._embedded
      .map((entity) => this.hoistEmbeds(entity))
      .map(this.addDefaultEmbeds)
      .map(this.convertDates)
  }

  async createEntity({
    accessToken,
    idToken,
    entityInput,
  }: {
    accessToken: string
    idToken: string
    entityInput: EntityInput
  }): Promise<Entity> {
    const result = await query<ApiResponse<null, null>>(
      this.createEntityMutation,
      entityInput,
      this.createQueryName(),
      { idToken, accessToken },
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
  }: {
    accessToken: string
    idToken: string
    id: string
    entityInput: EntityInput
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

  convertDates = (entity: Entity): Entity => {
    this.dateFields.forEach((dateField) => {
      if (entity[dateField]) entity[dateField] = new Date(entity[dateField])
    })

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
