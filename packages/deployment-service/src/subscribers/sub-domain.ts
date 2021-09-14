import { EntitySubscriberInterface, InsertEvent } from 'typeorm'
import { PipelineEntity } from './../entities'
import generate from 'project-name-generator'

export class SubDomainSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return PipelineEntity
  }
  
  async beforeInsert(event: InsertEvent<PipelineEntity>) {
    let unique = false

    while (unique === false) {
      event.entity.subDomain = generate().dashed

      const result = await event.manager.getRepository(PipelineEntity).count({
        where: {
          subDomain: event.entity.subDomain,
        },
      })

      unique = result === 0
    }
  }
}
