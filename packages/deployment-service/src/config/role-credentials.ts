import { registerAs } from '@nestjs/config'

export type RoleCredentialsType = {
  RoleArn: string
  RoleSessionName: string
}

export default registerAs(
  'role-credentials',
  (): RoleCredentialsType => ({
    RoleArn: (process.env.USERCODE_ROLE_ARN as string) || '',
    RoleSessionName: 'deployment-service',
  }),
)
