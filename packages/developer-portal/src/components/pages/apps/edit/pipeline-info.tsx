import { BodyText, ColSplit, Grid, InputWrap, Intent, StatusIndicator, Subtitle } from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import React from 'react'

const buildStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'CREATING_ARCHITECTURE':
      return 'primary'
    case 'COMPLETED':
      return 'primary'
    case 'IN_PROGRESS':
      return 'secondary'
    case 'PENDING':
    case 'QUEUED':
    case 'PAUSED':
      return 'critical'
    case 'FAILED':
    case 'DELETING':
      return 'danger'
    case 'READY_FOR_DEPLOYMENT':
      return 'low'
    default:
      return 'neutral'
  }
}

const buildStatusToReadable = (status: string): string =>
  status
    .split('_')
    .map((str) => str.toLowerCase())
    .join(' ')

export const PipelineInfo: React.FC<{ pipeline: PipelineModelInterface }> = ({ pipeline }) => {
  return (
    <Grid>
      <ColSplit>
        <InputWrap>
          <Subtitle>Status</Subtitle>
          <BodyText>
            <StatusIndicator intent={buildStatusToIntent(pipeline.buildStatus as string)} />{' '}
            {buildStatusToReadable(pipeline.buildStatus as string)}
          </BodyText>
        </InputWrap>
        <InputWrap>
          <Subtitle>Repository</Subtitle>
          <BodyText>{pipeline.repository}</BodyText>
        </InputWrap>
        <InputWrap>
          <Subtitle>Package Manager</Subtitle>
          <BodyText>{pipeline.packageManager}</BodyText>
        </InputWrap>
      </ColSplit>
      <ColSplit>
        <InputWrap>
          <Subtitle>Build Command</Subtitle>
          <BodyText>{pipeline.buildCommand}</BodyText>
        </InputWrap>
        <InputWrap>
          <Subtitle>Tests</Subtitle>
          <BodyText>{pipeline.testCommand}</BodyText>
        </InputWrap>
        <InputWrap>
          <Subtitle>Location</Subtitle>
          <BodyText>{pipeline.subDomain ? `https://${pipeline.subDomain}.dev.paas.reapit.cloud` : ''}</BodyText>
        </InputWrap>
      </ColSplit>
    </Grid>
  )
}
