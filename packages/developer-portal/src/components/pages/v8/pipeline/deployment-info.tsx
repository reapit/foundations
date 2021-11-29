import { cx } from '@linaria/core'
import {
  BodyText,
  Button,
  ButtonGroup,
  ColSplit,
  elMb6,
  InputWrap,
  Intent,
  StatusIndicator,
  Subtitle,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  Title,
  Grid,
} from '@reapit/elements'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import React from 'react'

const buildStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'CREATING_ARCHITECTURE':
      return 'primary'
    case 'SUCCESS':
      return 'primary'
    case 'RUNNING':
      return 'secondary'
    case 'PENDING':
    case 'QUEUED':
    default:
      return 'neutral'
  }
}

const buildStatusToReadable = (status: string): string =>
  status
    .split('_')
    .map((str) => str.toLowerCase())
    .join(' ')

const PipelineInfo = ({ pipeline }: { pipeline: PipelineModelInterface }) => (
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

export const PipelineDeploymentInfo = ({ pipeline }: { pipeline: PipelineModelInterface }) => {
  // TODO make some fetching func to get pipeline deployments and list them below

  const pipelineDeployments: PipelineRunnerModelInterface[] = []

  return (
    <>
      <PipelineInfo pipeline={pipeline} />
      <Title>Deployments</Title>
      <ButtonGroup className={cx(elMb6)}>
        <Button intent="primary">Deploy</Button>
        <Button intent="critical">Deploy With Cli</Button>
      </ButtonGroup>
      <Table>
        <TableHeadersRow>
          <TableHeader>Created</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader></TableHeader>
        </TableHeadersRow>
        {pipelineDeployments.map((deployment) => (
          <TableRow key={deployment.id}>
            <TableCell>{deployment.created}</TableCell>
            <TableCell>{deployment.buildStatus}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  )
}
