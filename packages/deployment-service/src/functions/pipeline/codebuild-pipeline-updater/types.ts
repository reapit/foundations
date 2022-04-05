import { CodeBuild } from 'aws-sdk'

export const acceptedPhases = ['BUILD', 'INSTALL', 'DOWNLOAD_SOURCE']
export enum EventEnum {
  STATE_CHANGE = 'CodeBuild Build State Change',
  PHASE_CHANGE = 'CodeBuild Build Phase Change',
}

export type BuildPhase = {
  ['phase-type']: CodeBuild.BuildPhaseType
  ['phase-status']?: CodeBuild.StatusType
  ['start-time']?: CodeBuild.Timestamp
  ['end-time']?: CodeBuild.Timestamp
  ['duration-in-seconds']: number
}

export type BuildPhaseChangeStatusEvent = {
  id: string
  ['detail-type']: EventEnum.PHASE_CHANGE
  detail: {
    ['build-id']: string
    ['additional-information']: {
      phases: BuildPhase[]
    }
  }
}

export type BuildStateChangeEvent = {
  ['detail-type']: EventEnum.STATE_CHANGE
  detail: {
    'build-status': CodeBuild.StatusType
    'project-name': string
    'build-id': string
    'additional-information': {
      'build-complete': false
      initiator: string
      'build-start-time': string
      'queued-timeout-in-minutes': number
    }
    'current-phase': CodeBuild.StatusType
    'current-phase-context': string
    version: string
  }
}
