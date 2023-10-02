import { buildStatusToIntent, buildStatusToReadable, pipelineViewable } from '..'

describe('pipeline helpers', () => {
  describe('buildStatusToIntent', () => {
    it('should return the correct intent', () => {
      expect(buildStatusToIntent('PROVISIONING')).toBe('primary')
      expect(buildStatusToIntent('SUCCEEDED')).toBe('success')
      expect(buildStatusToIntent('IN_PROGRESS')).toBe('neutral')
      expect(buildStatusToIntent('PROVISION_REQUEST')).toBe('pending')
      expect(buildStatusToIntent('QUEUED')).toBe('neutral')
      expect(buildStatusToIntent('PENDING')).toBe('pending')
      expect(buildStatusToIntent('SCHEDULED_FOR_DELETION')).toBe('danger')
      expect(buildStatusToIntent('FAILED')).toBe('danger')
      expect(buildStatusToIntent('DELETING')).toBe('danger')
      expect(buildStatusToIntent('DELETED')).toBe('danger')
      expect(buildStatusToIntent('READY_FOR_DEPLOYMENT')).toBe('pending')
    })
  })

  describe('buildStatusToReadable', () => {
    it('PROVISIONING', () => {
      expect(buildStatusToReadable('PROVISIONING')).toBe('Provisioning')
    })

    it('SCHEDULED_FOR_DELETION', () => {
      expect(buildStatusToReadable('SCHEDULED_FOR_DELETION')).toBe('Scheduled For Deletion')
    })
  })

  describe('pipelineViewable', () => {
    it('Not Viewable', () => {
      ;[
        'DELETING',
        'SCHEDULED_FOR_DELETION',
        'DELETED',
        'PRE_PROVISIONED',
        'PROVISIONING',
        'PROVISION_REQUEST',
        'FAILED_TO_PROVISION',
        'READY_FOR_DEPLOYMENT',
      ].forEach((state) => expect(pipelineViewable(state)).toBeFalsy())
    })

    it('Viewable', () => {
      ;['IN_PROGRESS', 'COMPLETED', 'FAILED', 'PENDING', 'QUEUED'].forEach((state) =>
        expect(pipelineViewable(state)).toBeTruthy(),
      )
    })
  })
})
