import { EventModule } from '../events'
import { PipelineModule } from '../pipeline'
import { Module } from '@nestjs/common'
import { AppEventWorkflow } from './app-event-workflow'

@Module({
  imports: [EventModule, PipelineModule],
  providers: [AppEventWorkflow],
})
export class AppEventModule {}
