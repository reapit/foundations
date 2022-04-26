import { Intent } from '@reapit/elements'

export const buildStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'PROVISIONING':
      return 'primary'
    case 'SUCCEEDED':
      return 'success'
    case 'IN_PROGRESS':
      return 'secondary'
    case 'PRE_PROVISIONED':
    case 'QUEUED':
      return 'critical'
    case 'FAILED':
    case 'DELETING':
    case 'DELETED':
    case 'FAILED_TO_PROVISION':
      return 'danger'
    case 'READY_FOR_DEPLOYMENT':
      return 'low'
    default:
      return 'neutral'
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
