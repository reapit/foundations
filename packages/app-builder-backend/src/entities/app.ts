import { ObjectType, Field, ID } from 'type-graphql'
import { Page } from './page'

@ObjectType('_App')
export class App {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  userId: string

  @Field(() => [Page])
  pages: Array<Page>

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
