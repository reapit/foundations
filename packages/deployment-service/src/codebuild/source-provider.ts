import { BitbucketClientData } from '../entities/bitbucket-client.entity'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import { BitbucketProvider } from '../bitbucket'
import { S3Provider } from '../s3'
import { Injectable } from '@nestjs/common'
import { App } from '@octokit/app'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class SoruceProvider {
  constructor(
    private readonly bitbucketProvider: BitbucketProvider,
    private readonly s3Provider: S3Provider,
    private readonly githubProvider: App,
    private readonly httpService: HttpService,
  ) {}

  readonly baseBitbucketUrl = 'https://bitbucket.org'

  async downloadBitbucketSourceToS3({
    pipeline,
    pipelineRunner,
    client,
  }: {
    pipeline: PipelineEntity
    pipelineRunner: PipelineRunnerEntity
    client?: BitbucketClientData
  }): Promise<string> {
    if (!pipeline.repository || !pipeline.repository.repositoryUrl) {
      throw new Error('Pipeline repository is not configured')
    }

    if (!client) {
      throw new Error('Cannot process bitbucket source request without client or event')
    }

    const parts = pipeline.repository.repositoryUrl.split('/')
    const url = `${this.baseBitbucketUrl}/${parts[parts.length - 2]}/${parts[parts.length - 1]}/get/${
      pipeline.branch
    }.zip`

    const tokenData = await this.bitbucketProvider.getBitBucketToken({
      key: client.key,
      clientKey: client.clientKey,
    })

    const result = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'Content-type': 'application/zip',
        },
        responseType: 'arraybuffer',
      }),
    )

    if (result.status !== 200) {
      throw new Error('failed to fetch zip from bitbucket')
    }

    const Key = `${pipelineRunner.id as string}.zip`

    await this.s3Provider.upload({
      Bucket: process.env.DEPLOYMENT_REPO_CACHE_BUCKET_NAME as string,
      Key,
      Body: result.data,
    })

    return [process.env.DEPLOYMENT_REPO_CACHE_BUCKET_NAME as string, Key].join('/')
  }

  async downloadGithubSourceToS3(pipeline: PipelineEntity, pipelineRunner: PipelineRunnerEntity): Promise<string> {
    const installationId = pipeline.repository?.installationId
    const parts = pipeline.repository?.repositoryUrl?.split('/') as string[]

    if (!installationId) {
      throw new Error('Pipeline repository is not configured or repository does not have reapit github app installed')
    }

    const response = await (
      await this.githubProvider.getInstallationOctokit(installationId)
    ).request('GET /repos/{owner}/{repo}/zipball/{ref}', {
      ref: pipeline.branch || '',
      owner: parts[parts.length - 2],
      repo: parts[parts.length - 1],
    })

    const Key = `${pipelineRunner.id as string}.zip`

    await this.s3Provider.upload({
      Bucket: process.env.DEPLOYMENT_REPO_CACHE_BUCKET_NAME as string,
      Key,
      Body: Buffer.from(response.data as ArrayBuffer),
    })

    return [process.env.DEPLOYMENT_REPO_CACHE_BUCKET_NAME as string, Key].join('/')
  }
}
