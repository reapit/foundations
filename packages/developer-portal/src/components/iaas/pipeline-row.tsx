import React, { FC, useState } from 'react'
import { buildStatusToIntent, buildStatusToReadable, pipelineViewable } from '../../utils/pipeline-helpers'
import Routes from '@/constants/routes'
import {
  Button,
  ButtonGroup,
  FlexContainer,
  StatusIndicator,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTriggerCell,
  TableRow,
  TableRowContainer,
} from '@reapit/elements'
import { useHistory } from 'react-router'
import { navigate, openNewPage } from '../../utils/navigation'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'

interface PipelineRowProps {
  pipeline: PipelineModelInterface
}

export const PipelineRow: FC<PipelineRowProps> = ({ pipeline }) => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <TableRowContainer>
      <TableRow>
        <TableCell>{pipeline.name}</TableCell>
        <TableCell>
          <StatusIndicator intent={buildStatusToIntent(pipeline.buildStatus as string)} />
          {buildStatusToReadable(pipeline.buildStatus as string)}
        </TableCell>
        <TableCell>
          <a target="_blank" href={pipeline.repository} rel="noreferrer">
            {pipeline.repository}
          </a>
        </TableCell>
        <TableExpandableRowTriggerCell
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        ></TableExpandableRowTriggerCell>
      </TableRow>
      <TableExpandableRow isOpen={isOpen}>
        <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
          <ButtonGroup>
            <Button
              intent="secondary"
              onClick={navigate(history, Routes.APP_PIPELINE_CONFIGURE.replace(':appId', pipeline.appId as string))}
            >
              Configure
            </Button>
            <Button
              intent="primary"
              onClick={navigate(history, Routes.APP_PIPELINE.replace(':appId', pipeline.appId as string))}
            >
              Deployments
            </Button>
            {pipelineViewable(pipeline.buildStatus as string) && (
              <Button
                intent="critical"
                chevronRight
                onClick={openNewPage(`https://${pipeline.subDomain}.iaas.reapit.cloud`)}
              >
                View App
              </Button>
            )}
          </ButtonGroup>
        </FlexContainer>
      </TableExpandableRow>
    </TableRowContainer>
  )
}
