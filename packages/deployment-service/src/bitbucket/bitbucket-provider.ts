import { BitbucketClientEntity } from '../entities/bitbucket-client.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as jwt from 'atlassian-jwt'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { PipelineProvider } from '../pipeline'
import { PipelineEntity } from '@/entities/pipeline.entity'

type PaginatedRepositories = {
  pagelen: number
  values: {
    full_name: string
    links: {
      html: {
        href: string
      }
    }
  }[]
}

@Injectable()
export class BitbucketProvider {
  constructor(
    @InjectRepository(BitbucketClientEntity) private readonly repository: Repository<BitbucketClientEntity>,
    private readonly httpService: HttpService,
    private readonly pipelineProvider: PipelineProvider,
  ) {}

  async create(clientKey: string, data: any) {
    delete data.sharedSecret

    const existing = await this.findByClientKey(clientKey)

    if (existing) await this.delete(existing)

    return this.repository.save(
      this.repository.create({
        clientKey,
        data,
      }),
    )
  }

  async delete(bitbucketClient: BitbucketClientEntity): Promise<void> {
    await this.pipelineProvider.removeBitbucketClient(bitbucketClient)
    await this.repository.delete({ clientKey: bitbucketClient.clientKey })
  }

  async findByClientKey(clientKey: string): Promise<BitbucketClientEntity | undefined> {
    return this.repository.findOne({ clientKey })
  }

  async listRepositories(client: BitbucketClientEntity): Promise<PaginatedRepositories> {
    const token = await this.getBitBucketToken({ key: client.data.key, clientKey: client.clientKey })
    const response = await firstValueFrom(
      this.httpService.get(`${client.data.baseApiUrl}/2.0/repositories/${client.data.principal.uuid}`, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }),
    )

    return response.data
  }

  async installClient(clientKey: string, data: any): Promise<PipelineEntity[]> {
    const client = await this.create(clientKey, data)
    // TODO loop until all pages complete?
    const repositories = await this.listRepositories(client)

    const pipelines = await this.pipelineProvider.findByRepos(repositories.values.map((repo) => repo.links.html.href))

    pipelines.forEach((pipeline) => {
      pipeline.bitbucketClient = client
    })

    return this.pipelineProvider.saveAll(pipelines)
  }

  async getBitBucketToken({ key, clientKey }: { key: string; clientKey: string }): Promise<{ access_token: string }> {
    const qs = (params: Record<string, any>) => {
      const sp = new URLSearchParams(params)
      return sp.toString()
    }
    const baseUrl = 'https://bitbucket.org'
    const url = 'https://bitbucket.org/site/oauth2/access_token'

    const opts = {
      method: 'post' as 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        grant_type: 'urn:bitbucket:oauth2:jwt',
      },
    }

    const req = jwt.fromMethodAndPathAndBody(opts.method, url, opts.body)
    const qsh = jwt.createQueryStringHash(req, true, baseUrl)

    const now = Math.floor(Date.now() / 1000)
    const exp = now + 3 * 60 // expires in 3 minutes
    const tokenData = {
      iss: key,
      iat: now, // the time the token is generated
      exp, // token expiry time
      sub: clientKey, // clientKey from /installed
      qsh,
    }

    const jwtToken = jwt.encodeSymmetric(tokenData, process.env.BITBUCKET_SHARED_SECRET as string)

    const res = await firstValueFrom(
      this.httpService.post<{ access_token: string }>(url, qs(opts.body), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `JWT ${jwtToken}`,
        },
      }),
    )

    if (!res || res.status !== 200) {
      throw new Error(`Failed to get access token: ${res?.status || 'no res'}`)
    }
    return res.data
  }
}
