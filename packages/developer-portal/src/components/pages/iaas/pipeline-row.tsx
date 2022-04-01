import React, { FC, useState } from 'react'
import { buildStatusToIntent, buildStatusToReadable, pipelineViewable } from '@/utils/pipeline-helpers'
import Routes from '@/constants/routes'
import {
  Button,
  ButtonGroup,
  StatusIndicator,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTriggerCell,
  TableRow,
  TableRowContainer,
} from '@reapit/elements'
import { useHistory } from 'react-router'
import { navigate, openNewPage } from '../../../utils/navigation'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { ApiNames } from '@reapit/utils-common'

export const PipelineRow: FC<{ pipeline: PipelineModelInterface }> = ({ pipeline }) => {
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
        <TableCell>{pipeline.appType}</TableCell>
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
        <ButtonGroup>
          <Button
            intent="secondary"
            onClick={navigate(history, Routes.APP_PIPELINE.replace(':appId', pipeline.appId as string))}
          >
            Manage
          </Button>
          {pipelineViewable(pipeline.buildStatus as string) && (
            <Button
              intent="primary"
              onClick={openNewPage(`https://${pipeline.subDomain}${ApiNames(window.reapit.config.appEnv).iaas}`)}
            >
              View
            </Button>
          )}
        </ButtonGroup>
      </TableExpandableRow>
    </TableRowContainer>
  )
}
