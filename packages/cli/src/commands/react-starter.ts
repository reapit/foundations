import { Command, Param } from './../decorators'
import { AbstractCommand } from './../abstract.command'
import { exec } from 'child_process'
import ora, { Ora } from 'ora'
import chalk from 'chalk'
import fs from 'fs'
import { resolve } from 'path'

type ReapitConfig = {
  connectClientId: string
  connectUserPoolId: string
  [s: string]: any
}

@Command({
  name: 'react-template',
  description: 'Creates a Reapit react app template setup',
})
export class ReactStarterCommand extends AbstractCommand {

  async checkFolderExists(path: string, spinner: Ora): Promise<void | never> {
    if (fs.existsSync(path)) {
      spinner.fail(`Folder already exists [${path}]`)
      process.exit(1)
    }
  }

  async createReactApp(spinner: Ora, name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      spinner.start('Creating app with create-react-app')
      exec(
        `npx create-react-app ${name} --template @reapit/cra-template-foundations`,
        { maxBuffer: 1024 * 10000 },
        (err) => {
          if (err !== null) {
            console.error(err)
            spinner.stop()
            reject()
          }
          spinner.stop()
          resolve()
        },
      )
    })
  }

  protected async installServerlessDeps(path: string): Promise<void> {
    const deps = ['serverless-deployment-bucket', 'serverless-s3-deploy', 'serverless-s3-remover', 'serverless-single-page-app-plugin']
    const result = await new Promise<void>((resolve, reject) => exec(`yarn add --dev ${deps.join(' ')}`, {
      cwd: process.cwd() + '/' + path,
    }, (err, stdout) => {
      if (err !== null) {
        console.error('err', err)
        reject()
      }
      resolve()
    }))
  }

  /**
   * Update the reapit.config.json file in the react template
   *
   * @param path
   * @param clientId
   * @param userPool
   */
  protected async updateConfigValues(path: string, clientId: string, userPool: string): Promise<void | never> {
    const reapitConfig = await this.resolveConfigFile<ReapitConfig>(`${path}/src/reapit.config.json`)

    if (!reapitConfig) {
      throw new Error('file not found')
    }

    reapitConfig.connectClientId = clientId
    reapitConfig.connectUserPoolId = userPool

    await this.writeConfigFile(`${path}/src/reapit.config.json`, reapitConfig)
  }

  protected async createServerlessConfig(path: string): Promise<void> {
    const content = `
service: ${path}
plugins:
  - serverless-single-page-app-plugin
  - serverless-deployment-bucket
  - serverless-s3-remover
  - serverless-s3-deploy

custom:
  s3WebAppBucket: cloud-${path}-web-app-\${opt:stage, 'dev'}
  s3CloudFormBucket: cloud-deployment-cloudform-templates-\${opt:stage, 'dev'}
  remover:
      buckets:
        - \${self:custom.s3WebAppBucket}
  assets:
    auto: true
    targets:
      - bucket: \${self:custom.s3WebAppBucket}
        files:
          - source: ./build/
            globs: '**/*'
provider:
  name: aws
  runtime: nodejs14.x
  stage: \${opt:stage, 'dev'}
  region: eu-west-2
  deploymentBucket:
    name: \${self:custom.s3CloudFormBucket}

resources:
  Resources:
    ## Specifying the S3 Bucket
    WebAppS3Bucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: \${self:custom.s3WebAppBucket}
        AccessControl: PublicRead
        WebsiteConfiguration:
          IndexDocument: index.html
          ErrorDocument: error.html

    ## Specifying the policies to make sure all files inside the Bucket are available to CloudFront
    WebAppS3BucketPolicy:
      Type: AWS::S3::BucketPolicy
      Properties:
        Bucket:
          Ref: WebAppS3Bucket
        PolicyDocument:
          Statement:
            - Sid: PublicReadGetObject
              Effect: Allow
              Principal: "*"
              Action:
              - s3:GetObject
              Resource:
                Fn::Join: [
                  "", [
                    "arn:aws:s3:::",
                    { "Ref": "WebAppS3Bucket" },
                    "/*"
                  ]
                ]

    ## Specifying the CloudFront Distribution to server your Web Application
    WebAppCloudFrontDistribution:
      Type: AWS::CloudFront::Distribution
      Properties:
        DistributionConfig:
          Origins:
            - DomainName:
                Fn::Join: [
                  "", [
                    { "Ref": "WebAppS3Bucket" },
                    ".s3.amazonaws.com"
                  ]
                ]
              Id: S3-\${self:custom.s3WebAppBucket}
              CustomOriginConfig:
                HTTPPort: 80
                HTTPSPort: 443
                OriginProtocolPolicy: https-only
              ## In case you want to restrict the bucket access use S3OriginConfig and remove CustomOriginConfig
              # S3OriginConfig:
              #   OriginAccessIdentity: origin-access-identity/cloudfront/E127EXAMPLE51Z
          Enabled: 'true'
          DefaultRootObject: index.html
          CustomErrorResponses:
            - ErrorCode: 404
              ResponseCode: 200
              ResponsePagePath: /index.html
            - ErrorCode: 403
              ResponseCode: 200
              ResponsePagePath: /index.html
            - ErrorCode: 400
              ResponseCode: 200
              ResponsePagePath: /index.html
          DefaultCacheBehavior:
            AllowedMethods:
              - GET
              - HEAD
              - OPTIONS
            TargetOriginId: S3-\${self:custom.s3WebAppBucket}
            ForwardedValues:
              QueryString: 'false'
              Cookies:
                Forward: none
            ViewerProtocolPolicy: redirect-to-https
          ViewerCertificate:
            CloudFrontDefaultCertificate: 'true'
          # Logging:
          #   IncludeCookies: 'false'
          #   Bucket: mylogs.s3.amazonaws.com
          #   Prefix: myprefix
  Outputs:
    WebAppCloudFrontDistributionOutput:
      Value:
        'Fn::GetAtt': [ WebAppCloudFrontDistribution, DomainName ]
    `

    await fs.promises.writeFile(resolve(process.cwd(), path, 'serverless.yml'), content, {
      encoding: 'utf8',
    })
  }

  async run(
    @Param({
      name: 'name',
      required: true,
    })
    name: string,
    @Param({
      name: 'clientId',
      required: true,
    })
    clientId: string,
    @Param({
      name: 'userPool',
      required: true,
    })
    userPool: string,
  ) {
    const spinner = ora()

    await this.checkFolderExists(name, spinner)

    try {
      await this.createReactApp(spinner, name)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }

    spinner.start('Replacing reapit config params')

    await this.updateConfigValues(name, clientId, userPool)

    spinner.info('Finished param config setup')

    spinner.info('Creating serverless config')
    await this.createServerlessConfig(name)
    spinner.info('Serverless file created')
    spinner.info('Installing serverless dependancies')
    await this.installServerlessDeps(name)
    spinner.succeed('Finished react starter setup')

    console.log(`


    ${chalk.green('Happy hacking commrade!')}

      cd into ${name} and start coding!

      If you use visual studio, use \`code ${name}\`
    `)
  }
}
