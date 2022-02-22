import { connect } from '@/core'
import { BitbucketClientEntity } from '../entities/bitbucket-client.entity'

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

  return repo.save(
    repo.create({
      clientKey,
      data,
    }),
  )
}
