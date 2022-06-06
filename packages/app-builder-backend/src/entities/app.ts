import { ObjectType, Field, ID } from 'type-graphql'
import { CustomEntity } from './custom-entity'
import { Page, Node } from './page'

@ObjectType('_App')
export class App {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  clientId: string

  @Field()
  subdomain: string

  @Field()
  developerName: string

  @Field(() => [Page])
  pages: Array<Page>

  @Field(() => [Node])
  header: Array<Node>

  @Field(() => [Node])
  footer: Array<Node>

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => [CustomEntity])
  customEntities: Array<CustomEntity>
}
