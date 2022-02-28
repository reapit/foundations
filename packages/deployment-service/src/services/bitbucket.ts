import { connect } from '@/core'
import { BitbucketClientEntity } from '../entities/bitbucket-client.entity'
import * as jwt from 'atlassian-jwt'
import fetch from 'node-fetch'

export const findByClientKey = async (clientKey: string): Promise<BitbucketClientEntity | undefined> => {
  const connection = await connect()
  const repo = connection.getRepository(BitbucketClientEntity)

  return repo.findOne({
    clientKey,
  })
}

export const saveClientInfo = async (clientKey: string, data: any): Promise<BitbucketClientEntity> => {
  const connection = await connect()
  const repo = connection.getRepository(BitbucketClientEntity)

  delete data.sharedSecret

  return repo.save(
    repo.create({
      clientKey,
      data,
    }),
  )
}

export const getBitBucketToken = async ({
  key,
  clientKey,
}: {
  key: string
  clientKey: string
}): Promise<{ access_token: string }> => {
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
  const options = {
    method: opts.method,
    headers: {
      ...opts.headers,
      Authorization: `JWT ${jwtToken}`,
    },
    body: qs(opts.body),
  }
  const res = await fetch(url, options)
  if (res.status !== 200) {
    throw new Error(`Failed to get access token: ${res.status}`)
  }
  return res.json()
}
