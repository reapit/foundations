import { EntitySubscriberInterface, InsertEvent, EventSubscriber, EntityManager, UpdateEvent } from 'typeorm'
import { PipelineEntity } from '../entities/pipeline.entity'
import generate from 'project-name-generator'

@EventSubscriber()
export class SubDomainSubscriber implements EntitySubscriberInterface<PipelineEntity> {
  listenTo() {
    return PipelineEntity
  }

  async generateSubDomain(manager: EntityManager): Promise<string> {
    let unique = false
    let domain: string

    do {
      domain = generate().dashed

      const result = await manager.getRepository(PipelineEntity).count({
        where: {
          subDomain: domain,
        },
      })

      unique = result === 0
    } while (unique === false)

    return domain
  }

  async beforeInsert(event: InsertEvent<PipelineEntity>) {
    event.entity.subDomain = await this.generateSubDomain(event.manager)
  }

  async beforeUpdate(event: UpdateEvent<PipelineEntity>) {
    if (!event.entity) return

    if (event.entity.subDomain === null) {
      event.entity.subDomain = event.databaseEntity.subDomain
    }
  }
}
