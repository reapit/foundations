import {
  ApolloServer as ApolloServerExpress,
  Config as ExpressConfig,
  GraphQLOptions as ExpressGraphqlOptions,
} from 'apollo-server-express'
import {
  ApolloServer as ApolloServerLambda,
  Config as LambdaConfig,
  GraphQLOptions as LambdaGraphqlOptions,
} from 'apollo-server-lambda'
import { GraphQLSchema } from 'graphql'

// https://github.com/apollographql/apollo-server/issues/2010#issuecomment-800218792
export class ExtendedApolloServerExpress extends ApolloServerExpress {
  private readonly _schemaCb?: (
    ...args: Parameters<ApolloServerExpress['createGraphQLServerOptions']>
  ) => Promise<GraphQLSchema> | GraphQLSchema
  private readonly _derivedData: WeakMap<GraphQLSchema, any> = new WeakMap()

  constructor({
    schemaCallback,
    ...rest
  }: ExpressConfig & {
    schemaCallback?: ExtendedApolloServerExpress['_schemaCb']
  }) {
    super(rest)
    this._schemaCb = schemaCallback
  }

  public async createGraphQLServerOptions(
    ...args: Parameters<ApolloServerExpress['createGraphQLServerOptions']>
  ): Promise<ExpressGraphqlOptions> {
    const options = await super.createGraphQLServerOptions.apply(this, args)
    if (this._schemaCb) {
      const schema = await this._schemaCb.apply(null, args)
      if (!this._derivedData.has(schema))
        this._derivedData.set(schema, this.constructor.prototype.generateSchemaDerivedData.call(this, schema))
      Object.assign(options, await this._derivedData.get(schema))
    }
    return options
  }
}

export class ExtendedApolloServerLambda extends ApolloServerLambda {
  private readonly _schemaCb?: (
    ...args: Parameters<ApolloServerLambda['createGraphQLServerOptions']>
  ) => Promise<GraphQLSchema> | GraphQLSchema
  private readonly _derivedData: WeakMap<GraphQLSchema, any> = new WeakMap()

  constructor({
    schemaCallback,
    ...rest
  }: LambdaConfig & {
    schemaCallback?: ExtendedApolloServerLambda['_schemaCb']
  }) {
    super(rest)
    this._schemaCb = schemaCallback
  }

  public async createGraphQLServerOptions(
    ...args: Parameters<ApolloServerLambda['createGraphQLServerOptions']>
  ): Promise<LambdaGraphqlOptions> {
    const options = await super.createGraphQLServerOptions.apply(this, args)
    if (this._schemaCb) {
      const schema = await this._schemaCb.apply(null, args)
      if (!this._derivedData.has(schema))
        this._derivedData.set(schema, this.constructor.prototype.generateSchemaDerivedData.call(this, schema))
      Object.assign(options, await this._derivedData.get(schema))
    }
    return options
  }
}
