/* istanbul ignore file */
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig from '../dynamo/config'
import { SessionModule } from '../session'
import { DynamoDBModule } from '../dynamo'
import { PaymentRequestModule } from '../payment-request'
import { PaymentReceiptModule } from '../payment-receipt'
import { PaymentsModule } from '../payments'
import { ClientConfigModule } from '../client-config'
import { OpayoModule } from '../opayo'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    SessionModule,
    PaymentRequestModule,
    PaymentReceiptModule,
    PaymentsModule,
    ClientConfigModule,
    OpayoModule,
    DynamoDBModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
