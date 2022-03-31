import { Intent } from '@reapit/elements'

export const buildStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'PROVISIONING':
      return 'primary'
    case 'COMPLETED':
      return 'primary'
    case 'IN_PROGRESS':
    case 'PROVISION_REQUEST':
      return 'secondary'
    case 'PENDING':
    case 'QUEUED':
      return 'critical'
    case 'FAILED':
      return 'danger'
    case 'DELETING':
    case 'SCHEDULED_FOR_DELETION':
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
    .map((str) => str.toLowerCase())
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
  ].includes(status)
