import { ObjectType, Field, ID } from 'type-graphql'
import { CustomEntity } from './custom-entity'
import { Page } from './page'

@ObjectType('_App')
export class App {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  name?: string

  @Field()
  clientId?: string

  @Field()
  subdomain: string

  @Field({ nullable: true })
  developerName?: string

  @Field(() => [Page])
  pages: Array<Page>

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => [CustomEntity])
  customEntities: Array<CustomEntity>
}
