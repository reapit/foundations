import { Intent } from '@reapit/elements'

export const pipelineStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'CANCELED':
      return 'neutral'
    case 'FAILED':
    case 'DELETING':
      return 'danger'
    case 'IN_PROGRESS':
    case 'CREATING_ARCHITECTURE':
      return 'critical'
    case 'AWAITING_DEPLOYMENT':
      return 'primary'
    case 'SUCCEEDED':
      return 'success'
    default:
      return 'neutral'
  }
}

export const pipelineStatusToName = (status: string): string => {
  switch (status) {
    case 'CANCELED':
      return 'Cancelled'
    case 'FAILED':
      return 'Failed'
    case 'IN_PROGRESS':
      return 'In Progress'
    case 'SUCCEEDED':
      return 'Succeeded'
    case 'CREATING_ARCHITECTURE':
      return 'Creating architecture'
    case 'AWAITING_DEPLOYMENT':
      return 'Awaiting deployment'
    case 'READY_FOR_DEPLOYMENT':
      return 'Ready for deployment'
    case 'DELETING':
      return 'Destroying'
    default:
      return 'Queued'
  }
}
