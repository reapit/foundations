import { Module } from '@nestjs/common'
import { PaymentsController } from './controller'
import { PaymentsProvider } from './provider'

@Module({
  providers: [PaymentsProvider],
  controllers: [PaymentsController],
  exports: [PaymentsProvider],
})
export class PaymentsModule {}
