import { Column, Entity } from 'typeorm'
import { AbstractEntity } from './abstract-entity'

export type BitbucketClientData = {
  productType: 'bitbucket'
  principle: {
    account_id: string
    display_name?: string
    type: 'user'
    job_title: string
    account_status: string
    nickname: string
  }
  baseUrl: string
  publicKey: string
  user: {
    display_name: string
  }
  key: string
  sharedSecret: string
  clientKey: string
  baseApiUrl: string
}

@Entity('bitbucket_clients')
export class BitbucketClientEntity extends AbstractEntity {
  @Column({
    unique: true,
  })
  clientKey: string

  @Column({
    type: 'json',
  })
  data: BitbucketClientData
}
