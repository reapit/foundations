import { Column, Entity, OneToMany } from 'typeorm'
import { AbstractEntity } from './abstract-entity'
import { PipelineEntity } from './pipeline.entity'

export type BitbucketClientData = {
  productType: 'bitbucket'
  principal: {
    uuid: string
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

  @OneToMany(() => PipelineEntity, (pipeline) => pipeline.bitbucketClient)
  pipelines?: PipelineEntity[]
}
