import { Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { EventModule } from './events'
import { PipelineModule } from './pipeline'

@Module({
  imports: [AuthModule, EventModule, PipelineModule],
})
export class AppModule {}
