import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @CreateDateColumn()
  created?: string

  @UpdateDateColumn()
  modified?: string
}
