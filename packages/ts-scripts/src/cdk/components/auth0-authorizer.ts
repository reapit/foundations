import * as cdk from 'aws-cdk-lib'
import { aws_apigateway, aws_lambda } from 'aws-cdk-lib'
import { createFunction } from './lambda-function'
import { resolve } from 'path'
import { execSync } from 'child_process'

const authorizerSingleton: Record<string, aws_apigateway.RequestAuthorizer> = {}

export type AuthorizerEnv =
  | {
      ISSUERS: string[]
      [s: string]: any
    }
  | {
      ISSUERS: string[]
      COGNITO_CLIENT_ID: string
      COGNITO_USER_POOL: string
      [s: string]: any
      /**
       * If using a custom authorizer, add the path to your file here. Make sure to curry the authorizer handler from ts-scripts
       */
      filePath?: string
    }

export type GetAuthorizerProps = {
  scope: cdk.Stack
  name: string
  env: AuthorizerEnv
}

/**
 * Create a custom authorizer or standard authorizer.
 *
 *
 * @returns
 */
export const getAuthorizer = ({ scope, name, env }: GetAuthorizerProps): aws_apigateway.RequestAuthorizer => {
  const customPath = env.path
  const path = customPath ?? 'packages/ts-scripts/src/authorizer/default-handler.handler'

  // build the default authorizer script if default is to be used
  if (!customPath)
    execSync('yarn build-authorizer', {
      cwd: __dirname,
      stdio: 'inherit',
    })

  const authorizerLambda = createFunction(
    scope,
    `${name}-lambda`,
    resolve(__dirname, '..', '..', '..', 'dist'),
    path,
    {
      ...env,
      ISSUERS: env?.ISSUERS.join(','),
    },
    undefined,
    undefined,
    undefined,
    aws_lambda.Runtime.NODEJS_18_X,
  )

  const authorizer = new aws_apigateway.RequestAuthorizer(scope, `${name}-authorizer`, {
    handler: authorizerLambda,
    identitySources: [aws_apigateway.IdentitySource.header('authorization')],
    resultsCacheTtl: cdk.Duration.seconds(0),
  })

  authorizerSingleton[path] = authorizer

  return authorizer
}
