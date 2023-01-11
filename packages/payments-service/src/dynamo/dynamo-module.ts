import { DataMapper } from '@aws/dynamodb-data-mapper'
import { DynamicModule, ForwardReference, Global, Module, Type } from '@nestjs/common'
import { DynamoDB } from 'aws-sdk'

export interface DynamoDBConfigInterface {}

const DYNAMODB_CONFIG_PROVIDE = 'DYNAMODB_CONFIG_PROVIDE'

@Module({})
@Global()
export class DynamoDBCoreModule {
  static forRootAsync({
    imports,
    inject,
    useFactory,
  }: {
    imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>
    useFactory: (...args: any[]) => Promise<DynamoDBConfigInterface> | DynamoDBConfigInterface
    inject: any[]
  }): DynamicModule {
    return {
      module: DynamoDBCoreModule,
      imports: [...imports],
      providers: [
        {
          provide: DYNAMODB_CONFIG_PROVIDE,
          useFactory,
          inject,
        },
        {
          provide: DynamoDB,
          useFactory: (config) => new DynamoDB(config),
          inject: [DYNAMODB_CONFIG_PROVIDE],
        },
        {
          provide: DataMapper,
          useFactory: (client: DynamoDB) =>
            new DataMapper({
              client,
            }),
          inject: [DynamoDB],
        },
      ],
      exports: [DynamoDB, DataMapper],
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: DynamoDBCoreModule,
    }
  }
}
