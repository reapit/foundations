import { ObjectType, Field, registerEnumType, InputType } from 'type-graphql'

enum FieldType {
  string = 'string',
  number = 'number',
}

registerEnumType(FieldType, {
  name: '_FieldType',
})

@InputType('_CustomEntityFieldInput')
@ObjectType('_CustomEntityField', { description: '@labelKeys(name)' })
export class CustomEntityField {
  @Field()
  id: string

  @Field()
  name: string

  @Field(() => FieldType)
  type: FieldType
}

@ObjectType('_CustomEntity', { description: '@labelKeys(name)' })
export class CustomEntity {
  @Field()
  id: string

  @Field()
  name: string

  @Field(() => [CustomEntityField])
  fields: CustomEntityField[]
}

@InputType('_CustomEntityInput')
export class CustomEntityInput {
  @Field()
  id: string

  @Field()
  name: string

  @Field(() => [CustomEntityField])
  fields: CustomEntityField[]
}
