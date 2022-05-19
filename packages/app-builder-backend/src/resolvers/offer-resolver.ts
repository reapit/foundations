import { Offer, OfferFragment, OfferInput } from "../entities/offer"
import { Context } from "@apollo/client"
import { gql } from "apollo-server-core"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { AbstractCrudService } from "./abstract-crud-resolver"

type OfferEmbed = {

}

class OfferService extends AbstractCrudService<Offer, OfferEmbed, OfferInput> {
}

const getOfferQuery = gql`
${OfferFragment}
  query GetOffer($id: String!) {
    GetOfferById(id: $id) {
      ...OfferFragment
    }
  }
`

const getOffersQuery = gql`
${OfferFragment}
{
  GetOffers {
    _embedded {
      ...OfferFragment
    }
  }
}
`

const createOfferMutation = gql`
${OfferFragment}
mutation CreateOffer(
  $id: String!
  $currency: String
  $applicantId: String
  $propertyId: String
  $OfferId: String
  $date: String
  $amount: String
  $status: String
  $inclusions: String
  $exclusions: String
  $conditions: String
  $metadata: JSON
) {
  CreateOffer(
    id: $id
    currency: $currency
    applicantId: $applicantId
    propertyId: $propertyId
    OfferId: $OfferId
    date: $date
    amount: $amount
    status: $status
    inclusions: $inclusions
    exclusions: $exclusions
    conditions: $conditions
    metadata: $metadata
  ){
    OfferFragment
  }
}
  `

const updateOfferMutation = gql`
  mutation UpdateOffer(
    $id: String!
    $currency: String
    $applicantId: String
    $propertyId: String
    $OfferId: String
    $date: String
    $amount: String
    $status: String
    $inclusions: String
    $exclusions: String
    $conditions: String
    $metadata: JSON
  ) {
    UpdateOffer(
      id: $id
      currency: $currency
      applicantId: $applicantId
      propertyId: $propertyId
      OfferId: $OfferId
      date: $date
      amount: $amount
      status: $status
      inclusions: $inclusions
      exclusions: $exclusions
      conditions: $conditions
      metadata: $metadata
    ){
    OfferFragment
  }
}
`

const entityName = 'offer'

@Resolver(() => Offer)
export class OfferResolver {
  readonly service: OfferService
  constructor() {
    this.service = new OfferService(
      getOfferQuery,
      getOffersQuery,
      updateOfferMutation,
      createOfferMutation,
      'Offer',
    )
  }

  @Query(() => Offer)
  @Authorized()
  async getOffer(
    @Ctx() { idToken, accessToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
  ): Promise<Offer> {
    const offer = await this.service.getEntity({
      id,
      idToken,
      accessToken,
    })

    if (!offer) {
      throw new Error(`Offer was not found with id [${id}]`)
    }

    storeCachedMetadata(entityName, id, offer)
    return offer
  }

  @Query(() => [Offer])
  @Authorized()
  async listOffers(
    @Ctx() { idToken, accessToken }: Context,
  ): Promise<Offer[]> {
    return this.service.getEntities({
      idToken,
      accessToken,
    })
  }

  @Mutation(() => Offer)
  @Authorized()
  async createOffer(
    @Ctx() { idToken, accessToken, storeCachedMetadata }: Context,
    @Arg(entityName) entityInput: OfferInput,
  ): Promise<Offer> {
    const offer = await this.service.createEntity({
      accessToken,
      idToken,
      entityInput,
    })

    storeCachedMetadata(entityName, offer.id, offer.metadata)
    return offer
  }

  @Mutation(() => Offer)
  @Authorized()
  async updateOffer(
    @Ctx() { idToken, accessToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
    @Arg(entityName) entityInput: OfferInput,
  ): Promise<Offer> {
    const offer = await this.service.updateEntity({
      id,
      accessToken,
      idToken,
      entityInput,
    })

    storeCachedMetadata(entityName, offer.id, offer.metadata)
    return offer
  }
}
