import { EntitySubscriberInterface, InsertEvent, EventSubscriber } from 'typeorm'
import { PipelineEntity } from './../entities'
import generate from 'project-name-generator'

@EventSubscriber()
export class SubDomainSubscriber implements EntitySubscriberInterface<PipelineEntity> {
  listenTo() {
    return PipelineEntity
  }

  async beforeInsert(event: InsertEvent<PipelineEntity>) {
    let unique = false

    do {
      event.entity.subDomain = generate().dashed

      const result = await event.manager.getRepository(PipelineEntity).count({
        where: {
          subDomain: event.entity.subDomain,
        },
      })

      unique = result === 0
    } while (unique === false)
  }
}
