import { AppTypeEnum, PackageManagerEnum } from '../dto'
import { PipelineModelInterface } from '../../../foundations-ts-definitions/deployment-schema'
import { Column, Entity, OneToMany } from 'typeorm'
import { AbsrtactEntity } from './abstract-entity'
import { PipelineRunnerEntity } from './pipeline-runner.entity'

@Entity('pipelines')
export class PipelineEntity extends AbsrtactEntity implements PipelineModelInterface {
  @Column()
  name?: string

  @Column({
    default: AppTypeEnum.REACT,
  })
  appType?: AppTypeEnum

  @Column()
  buildCommand?: string = 'build'

  @Column({
    default: PackageManagerEnum.NPM,
  })
  packageManager?: PackageManagerEnum

  @Column()
  repository?: string

  @OneToMany(() => PipelineRunnerEntity, (pipelineRunner) => pipelineRunner.pipeline)
  runners?: PipelineRunnerEntity[]

  @Column()
  developerId?: string
}
