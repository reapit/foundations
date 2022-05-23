import { PropertyImage, PropertyImageFragment, PropertyImageInput } from '../entities/property-image'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { AbstractCrudService } from './abstract-crud-resolver'
import { Context } from '../types'

type PropertyImageEmbeds<PropertyImage> = PropertyImage & {
  _embedded: {}
}

class PropertyImageService extends AbstractCrudService<
  PropertyImage,
  PropertyImageEmbeds<PropertyImage>,
  PropertyImageInput
> {}

const getPropertyImageQuery = gql`
  ${PropertyImageFragment}
  query getPropertyImageById($id: String!) {
    GetPropertyImageById(id: $id) {
      ...PropertyImageFragment
    }
  }
`

const getPropertyImagesQuery = gql`
  ${PropertyImageFragment}
  query getPropertyImages($propertyId: [String!]) {
    GetPropertyImages(propertyId: $propertyId) {
      _embedded {
        ...PropertyImageFragment
      }
    }
  }
`

const createPropertyImageMutation = gql`
  ${PropertyImageFragment}
  mutation createPropertyImage($data: String, $caption: String, $propertyId: String!, $type: String!) {
    CreatePropertyImage(propertyId: $propertyId, caption: $caption, type: $type, data: $data) {
      ...PropertyImageFragment
    }
  }
`

const updatePropetyImageMutation = gql`
  ${PropertyImageFragment}
  mutation updatePropertyImage($caption: String, $id: String!, $type: String!) {
    UpdatePropertyImage(id: $id, caption: $caption, type: $type) {
      ...PropertyImageFragment
    }
  }
`

const entityName = 'propertyImage'

@Resolver(() => PropertyImage)
export class PropertyImageResolver {
  readonly service: PropertyImageService
  constructor() {
    this.service = new PropertyImageService(
      getPropertyImageQuery,
      getPropertyImagesQuery,
      updatePropetyImageMutation,
      createPropertyImageMutation,
      'PropertyImage',
    )
  }

  @Query(() => PropertyImage)
  @Authorized()
  async getPropertyImage(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
  ): Promise<PropertyImage> {
    const propertyImage = await this.service.getEntity({
      id,
      idToken,
      accessToken,
    })

    if (!propertyImage) {
      throw new Error(`No propertyImage found for id [${id}]`)
    }

    storeCachedMetadata(entityName, id, propertyImage)

    return propertyImage
  }

  @Query(() => [PropertyImage])
  @Authorized()
  async listPropertyImages(
    @Ctx() { accessToken, idToken }: Context,
    @Arg('propertyId') propertyId: string,
  ): Promise<PropertyImage[]> {
    const propertyImages = await this.service.getEntities({
      idToken,
      accessToken,
      variables: {
        propertyId,
      },
    })

    return propertyImages
  }

  @Mutation(() => PropertyImage)
  @Authorized()
  async createPropertyImage(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg(entityName) entityInput: PropertyImageInput,
  ): Promise<PropertyImage> {
    console.log('incoming', entityInput)
    const propertyImage = await this.service.createEntity({
      accessToken,
      idToken,
      entityInput,
      variables: {
        propertyId: entityInput.propertyId,
      },
    })

    storeCachedMetadata(entityName, propertyImage.id, propertyImage)

    return propertyImage
  }

  @Mutation(() => PropertyImage)
  @Authorized()
  async updatePropertyImage(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
    @Arg(entityName) entityInput: PropertyImageInput,
  ): Promise<PropertyImage> {
    console.log('incoming', entityInput)
    const propertyImage = await this.service.updateEntity({
      id,
      accessToken,
      idToken,
      entityInput,
    })

    storeCachedMetadata(entityName, propertyImage.id, propertyImage)

    return propertyImage
  }
}
