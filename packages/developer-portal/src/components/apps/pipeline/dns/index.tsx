import React, { FC, useState } from 'react'
import { useAppState } from '../../state/use-app-state'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineTabs } from '../pipeline-tabs'
import { elMb6, Loader, PersistentNotification } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { DnsConfiguration } from './dns-configuration'
import { cx } from '@linaria/core'

export const PipelineDns: FC<{}> = () => {
  const { appPipelineState } = useAppState()
  const [errorAcknowledged, setErrorAcknowledged] = useState<boolean>(false)

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const {
    buildStatus,
    certificateError,
    id: pipelineId,
    certificateStatus,
  } = appPipelineState.appPipeline as PipelineModelInterface & {
    domainVerified: string
    verifyDnsName: string
    verifyDnsValue: string
    customDomain: string
    certificateStatus: string
    certificateError: string
  }

  const isFoundationsDeveloperAdmin = connectSession?.loginIdentity.groups.includes('FoundationsDeveloperAdmin')
  const canConfigureDns =
    buildStatus && ['CREATED', 'READY_FOR_DEPLOYMENT', 'FAILED', 'SUCCEEDED', 'IN_PROGRESS'].includes(buildStatus)

  return (
    <>
      <PipelineTabs />
      {!isFoundationsDeveloperAdmin ? (
        <>
          <p>
            You do not have permission to configure a custom domain name. Please contact an administrator of your
            developer organisation to request access
          </p>
        </>
      ) : connectSession && pipelineId ? (
        <>
          {certificateError && !errorAcknowledged && (
            <>
              <PersistentNotification className={cx(elMb6)} isExpanded intent="danger" isInline>
                {certificateError}
              </PersistentNotification>
            </>
          )}
          {canConfigureDns ? (
            <DnsConfiguration
              connectSession={connectSession}
              pipelineId={pipelineId}
              certificateError={certificateError}
              certificateStatus={certificateStatus}
            />
          ) : (
            <PersistentNotification isExpanded isFullWidth isInline intent="danger">
              You need to provision your pipeline before you can configure a custom DNS.
            </PersistentNotification>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
