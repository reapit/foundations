import { Intent } from '@reapit/elements'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions'

export const buildStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'PROVISIONING':
      return 'primary'
    case 'SUCCEEDED':
    case 'COMPLETED':
      return 'success'
    case 'IN_PROGRESS':
    case 'QUEUED':
      return 'neutral'
    case 'FAILED':
    case 'DELETING':
    case 'DELETED':
    case 'FAILED_TO_PROVISION':
    case 'SCHEDULED_FOR_DELETION':
      return 'danger'
    case 'PRE_PROVISIONED':
    case 'READY_FOR_DEPLOYMENT':
    default:
      return 'pending'
  }
}

export const runnerTypeToReadable = (type: PipelineRunnerType): string => {
  switch (type) {
    case 'BUILD':
      return 'Pulled from repo'
    case 'RELEASE':
      return 'Built from zip'
    case 'REPO':
      return 'Git pushed'
    default:
      return 'Unknown'
  }
}

export const buildStatusToReadable = (status: string): string =>
  status
    .split('_')
    .map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`)
    .join(' ')

export const pipelineViewable = (status: string): boolean =>
  ![
    'DELETING',
    'SCHEDULED_FOR_DELETION',
    'DELETED',
    'PRE_PROVISIONED',
    'PROVISIONING',
    'PROVISION_REQUEST',
    'FAILED_TO_PROVISION',
    'READY_FOR_DEPLOYMENT',
  ].includes(status)
