import { buildStatusToIntent, buildStatusToReadable, pipelineViewable } from '..'

describe('pipeline helpers', () => {
  describe('buildStatusToIntent', () => {
    it('primary', () => {
      expect(buildStatusToIntent('PROVISIONING')).toBe('primary')
      expect(buildStatusToIntent('SUCCEEDED')).toBe('success')
    })

    it('secondary', () => {
      expect(buildStatusToIntent('IN_PROGRESS')).toBe('secondary')
      expect(buildStatusToIntent('PROVISION_REQUEST')).toBe('neutral')
    })

    it('critical', () => {
      expect(buildStatusToIntent('QUEUED')).toBe('critical')
    })

    it('neutral', () => {
      expect(buildStatusToIntent('PENDING')).toBe('neutral')
      expect(buildStatusToIntent('SCHEDULED_FOR_DELETION')).toBe('neutral')
    })

    it('danger', () => {
      expect(buildStatusToIntent('FAILED')).toBe('danger')
      expect(buildStatusToIntent('DELETING')).toBe('danger')
      expect(buildStatusToIntent('DELETED')).toBe('danger')
    })

    it('low', () => {
      expect(buildStatusToIntent('READY_FOR_DEPLOYMENT')).toBe('low')
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
