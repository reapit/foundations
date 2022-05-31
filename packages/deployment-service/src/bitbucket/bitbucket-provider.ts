import { BitbucketClientEntity } from '../entities/bitbucket-client.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as jwt from 'atlassian-jwt'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class BitbucketProvider {
  constructor(
    @InjectRepository(BitbucketClientEntity) private readonly repository: Repository<BitbucketClientEntity>,
    private readonly httpService: HttpService,
  ) {}

  async create(clientKey: string, data: any) {
    delete data.sharedSecret

    return this.repository.save(
      this.repository.create({
        clientKey,
        data,
      }),
    )
  }

  async findByClientKey(clientKey: string): Promise<BitbucketClientEntity | undefined> {
    return this.repository.findOne({ clientKey })
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
