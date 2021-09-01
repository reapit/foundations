import { Intent } from '@reapit/elements'

export const pipelineStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'CANCELED':
      return 'neutral'
    case 'FAILED':
      return 'danger'
    case 'IN_PROGRESS':
      return 'critical'
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
    default:
      return 'Creating Architecture'
  }
}
