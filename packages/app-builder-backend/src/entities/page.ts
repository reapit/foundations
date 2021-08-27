import { ObjectType, Field, ID } from 'type-graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@ObjectType('_NodeType')
export class NodeType {
  @Field()
  resolvedName: string
}

@ObjectType('_Node')
export class Node {
  @Field(() => ID)
  id: string

  @Field()
  displayName: string

  @Field()
  hidden: boolean

  @Field()
  isCanvas: boolean

  @Field(() => [String])
  nodes: Array<string>

  @Field(() => GraphQLJSONObject)
  linkedNodes: Record<string, string>

  @Field(() => GraphQLJSONObject)
  props: Record<string, string | number>

  @Field(() => NodeType)
  type: NodeType
}

@ObjectType('_Page')
export class Page {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(() => [Node])
  nodes: Array<Node>
}
