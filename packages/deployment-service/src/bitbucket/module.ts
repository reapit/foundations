import { BitBucketWebhookController } from './bitbucket-webhook-controller'
import { EventModule } from '../events'
import { PipelineModule } from '../pipeline'
import { PipelineRunnerModule } from '../pipeline-runner'
import { Module } from '@nestjs/common'
import { BitbucketProvider } from './bitbucket-provider'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BitbucketClientEntity } from '../entities/bitbucket-client.entity'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    EventModule,
    PipelineRunnerModule,
    PipelineModule,
    TypeOrmModule.forFeature([BitbucketClientEntity]),
    HttpModule,
  ],
  providers: [BitbucketProvider],
  controllers: [BitBucketWebhookController],
  exports: [BitbucketProvider],
})
export class BitbucketModule {}
