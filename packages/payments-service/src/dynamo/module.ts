import { DynamicModule, ForwardReference, Module, Type } from "@nestjs/common";
import { DynamoDBConfigInterface, DynamoDBCoreModule } from "./core.module";

@Module({})
export class DynamoDBModule {
  static forRootAsync(config: {
    imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>
    useFactory: (...args: any[]) => Promise<DynamoDBConfigInterface> | DynamoDBConfigInterface
    inject: any[]
  }): DynamicModule {
    return {
      module: DynamoDBModule,
      imports: [DynamoDBCoreModule.forRootAsync(config)],
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: DynamoDBModule,
    }
  }
}
