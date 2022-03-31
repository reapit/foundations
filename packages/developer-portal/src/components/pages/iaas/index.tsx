import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { buildStatusToIntent, buildStatusToReadable, pipelineViewable } from '@/utils/pipeline-helpers'
import { cx } from '@linaria/core'
import { useReapitConnect } from '@reapit/connect-session'
import { BodyText, Card, Col, elFadeIn, Grid, Loader, StatusIndicator, Title } from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { ApiNames, GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { useHistory } from 'react-router'
import { navigate } from '../../../utils/navigation'
import { cardCursor } from '../apps/list/__styles__'

const PipelineCard = ({ pipeline }: { pipeline: PipelineModelInterface }) => {
  const history = useHistory()

  return (
    <Card
      className={cx(elFadeIn, cardCursor)}
      onClick={navigate(history, Routes.APP_PIPELINE.replace(':appId', pipeline.appId as string))}
      hasMainCard
      mainCardHeading={
        <>
          <StatusIndicator intent={buildStatusToIntent(pipeline.buildStatus as string)} />
          {pipeline.name}
        </>
      }
      mainCardSubHeading={buildStatusToReadable(pipeline.buildStatus as string)}
      mainCardSubHeadingAdditional={pipeline.appType}
      mainCardBody={
        <>
          <BodyText>{pipeline.repository || <>&nbsp;</>}</BodyText>
          {pipelineViewable(pipeline.buildStatus as string) && (
            <BodyText>
              <a
                onClick={(e) => {
                  e.stopPropagation()
                }}
                href={`https://${pipeline.subDomain}${ApiNames(window.reapit.config.appEnv).iaas}`}
              >
                View
              </a>
            </BodyText>
          )}
        </>
      }
    />
  )
}

export const IaaS = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [pipelines, loading] = useReapitGet<{
    items: PipelineModelInterface[]
  }>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.paginatePipeline],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
    onError: () => {
      // TODO we already display errors below, so no need to show a toast here
    },
  })

  return (
    <>
      <Title>IaaS</Title>
      <BodyText>A List of results of your pipelines</BodyText>
      {loading ? (
        <Loader />
      ) : (
        <Grid>
          {pipelines?.items?.map((pipeline) => (
            <Col key={pipeline.id}>
              <PipelineCard pipeline={pipeline} />
            </Col>
          ))}
        </Grid>
      )}
    </>
  )
}

export default IaaS
