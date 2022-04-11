import { EventModule } from '../events'
import { Module } from '@nestjs/common'
import { PipelineController } from './pipeline-controller'
import { PipelineProvider } from './pipeline-provider'

@Module({
  imports: [
    EventModule,
  ],
  providers: [
    PipelineProvider,
  ],
  controllers: [
    PipelineController,
  ],
})
export class PipelineModule {}
