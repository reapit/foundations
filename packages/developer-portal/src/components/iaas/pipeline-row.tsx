import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { buildStatusToIntent, buildStatusToReadable, pipelineViewable } from '@reapit/utils-common'
import Routes from '../../constants/routes'
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
import { useNavigate } from 'react-router'
import { navigateRoute, openNewPage } from '../../utils/navigation'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { ReapitConnectSession } from '@reapit/connect-session'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import { handlePipelineEvent } from '../apps/page/pusher-event-wrapper'

interface PipelineRowProps {
  pipeline: PipelineModelInterface & { runtime: string }
  connectSession: ReapitConnectSession
}

export const PipelineRow: FC<PipelineRowProps> = ({ pipeline, connectSession }) => {
  const navigate = useNavigate()
  const [appPipeline, setAppPipeline] = useState<PipelineModelInterface & { runtime: string }>(pipeline)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const channel = useChannel(`private-${connectSession?.loginIdentity.developerId}`)
  useEvent(
    channel,
    'pipeline-update',
    handlePipelineEvent(
      appPipeline,
      setAppPipeline as Dispatch<SetStateAction<(PipelineModelInterface & { runtime: string }) | null>>,
      pipeline.id ?? null,
    ),
  )

  return (
    <TableRowContainer>
      <TableRow>
        <TableCell>{appPipeline.name}</TableCell>
        <TableCell>
          <StatusIndicator intent={buildStatusToIntent(appPipeline.buildStatus as string)} />
          {buildStatusToReadable(appPipeline.buildStatus as string)}
        </TableCell>
        <TableCell>
          <a target="_blank" href={appPipeline.repository?.repositoryUrl} rel="noreferrer">
            {appPipeline.repository?.repositoryUrl}
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
              intent="primary"
              onClick={navigateRoute(
                navigate,
                Routes.APP_PIPELINE_CONFIGURE.replace(':appId', appPipeline.appId as string),
              )}
            >
              Configure
            </Button>
            <Button
              intent="primary"
              onClick={navigateRoute(navigate, Routes.APP_PIPELINE.replace(':appId', appPipeline.appId as string))}
            >
              Deployments
            </Button>
            {pipelineViewable(appPipeline.buildStatus as string) && (
              <Button intent="default" onClick={openNewPage(`https://${appPipeline.subDomain}.iaas.paas.reapit.cloud`)}>
                View App
              </Button>
            )}
          </ButtonGroup>
        </FlexContainer>
      </TableExpandableRow>
    </TableRowContainer>
  )
}
