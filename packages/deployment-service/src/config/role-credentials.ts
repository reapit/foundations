import { RoleCredentialsType } from '../aws/assumed-role-credentials'
import { registerAs } from '@nestjs/config'

export default registerAs(
  'role-credentials',
  (): RoleCredentialsType => ({
    RoleArn: process.env.USERCODE_ROLE_ARN as string,
    RoleSessionName: 'deployment-service',
  }),
)
