import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@reapit/utils-nest/src'
import { AwsModule } from './aws/aws-module'
import { CmsModule } from './cms/cms-module'

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, AwsModule, CmsModule],
})
export class AppModule {}
