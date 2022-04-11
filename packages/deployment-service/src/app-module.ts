import { Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { EventModule } from './events'
import { PipelineModule } from './pipeline'
import { PipelineRunnerModule } from './pipeline-runner/module'

@Module({
  imports: [AuthModule, EventModule, PipelineModule, PipelineRunnerModule],
  exports: [EventModule, AuthModule],
})
export class AppModule {}
