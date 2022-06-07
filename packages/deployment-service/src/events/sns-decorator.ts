import { TopicDetails, TopicEnum } from '../constants'

export const SNS_HANDLER = 'SNS_HANDLER'

export const SnsEvent = (topic: TopicEnum) => (target) =>
  Reflect.defineMetadata(SNS_HANDLER, TopicDetails[topic], target)
