import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@ObjectType('_NodeType')
@InputType('_NodeTypeInput')
export class NodeType {
  @Field()
  resolvedName: string
}

@ObjectType('_Node')
@InputType('_NodeInput')
export class Node {
  @Field(() => ID)
  id: string

  @Field()
  nodeId: string

  @Field()
  displayName: string

  @Field()
  hidden: boolean

  @Field({ nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  parent: string | null

  @Field()
  isCanvas: boolean

  @Field(() => [String])
  nodes: Array<string>

  @Field(() => GraphQLJSONObject)
  linkedNodes: Record<string, string>

  @Field(() => GraphQLJSONObject)
  props: Record<string, string | number | boolean | undefined>

  @Field(() => NodeType)
  type: NodeType

  @Field(() => GraphQLJSONObject, { nullable: true })
  custom: Record<string, any>
}

@ObjectType('_Page')
@InputType('_PageInput')
export class Page {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  entityName: string

  @Field()
  pageType: 'create' | 'update' | 'list'

  @Field(() => [Node])
  nodes: Array<Node>
}
