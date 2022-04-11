import { Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { EventModule } from './events'
import { PipelineModule } from './pipeline'
import { PipelineRunnerModule } from './pipeline-runner'
import { S3Module } from './s3'

@Module({
  imports: [AuthModule, EventModule, PipelineModule, PipelineRunnerModule, S3Module],
  exports: [EventModule, AuthModule],
})
export class AppModule {}
