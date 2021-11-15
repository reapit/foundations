import {
  BodyText,
  InputWrap,
  Subtitle,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
} from '@reapit/elements'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import React from 'react'

const PipelineInfo = ({ pipeline }: { pipeline: PipelineModelInterface }) => (
  <>
    <InputWrap>
      <Subtitle>Repository</Subtitle>
      <BodyText>{pipeline.repository}</BodyText>
    </InputWrap>
    <InputWrap>
      <Subtitle>Package Manager</Subtitle>
      <BodyText>{pipeline.packageManager}</BodyText>
    </InputWrap>
    <InputWrap>
      <Subtitle>Build Command</Subtitle>
      <BodyText>{pipeline.buildCommand}</BodyText>
    </InputWrap>
    <InputWrap>
      <Subtitle>Tests</Subtitle>
      <BodyText>{pipeline.testCommand}</BodyText>
    </InputWrap>
  </>
)

export const PipelineDeploymentInfo = ({ pipeline }: { pipeline: PipelineModelInterface }) => {
  // TODO make some fetching func to get pipeline deployments and list them below

  const pipelineDeployments: PipelineRunnerModelInterface[] = []

  return (
    <>
      <PipelineInfo pipeline={pipeline} />
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
