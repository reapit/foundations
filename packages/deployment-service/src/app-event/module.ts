import { EventModule } from '../events'
import { PipelineModule } from '../pipeline'
import { Module } from '@nestjs/common'
import { AppEventWorkflow } from './app-event-workflow'
import { MarketplaceModule } from '../marketplace'

@Module({
  imports: [EventModule, PipelineModule, MarketplaceModule],
  providers: [AppEventWorkflow],
})
export class AppEventModule {}
