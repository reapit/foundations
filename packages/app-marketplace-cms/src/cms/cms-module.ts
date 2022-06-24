import { AwsModule } from "../aws/aws-module"
import { Module } from "@nestjs/common"
import { CmsController } from "./cms-controller"
import { CmsProvider } from "./cms-provider"
import { AuthModule } from "@reapit/utils-nest"

@Module({
  imports: [AwsModule, AuthModule],
  providers: [CmsProvider],
  controllers: [CmsController],
})
export class CmsModule {}
