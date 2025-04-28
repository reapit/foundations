import React, { FC, useState } from 'react'
import { useAppState } from '../../state/use-app-state'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineTabs } from '../pipeline-tabs'
import { Loader } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { DnsConfiguration } from './dns-configuration'

export const PipelineDns: FC<{}> = () => {
  const { appPipelineState } = useAppState()
  const [errorAcknowledged, setErrorAcknowledged] = useState<boolean>(false)

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const {
    buildStatus,
    certificateError,
    id: pipelineId,
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
            You don&apos;t have permission to configure a custom DNS. Please contact the{' '}
            <a
              href="mailto:iaasbeta@reapitfoundations.zendesk.com?subject=IAAS%20Beta%20custom%20DNS%20permission"
              target="_blank"
              rel="noopener noreferrer"
            >
              IaaS team.
            </a>{' '}
            if you&apos;re looking to configure a custom domain for your pipeline.
          </p>
        </>
      ) : connectSession && pipelineId ? (
        <>
          <DnsConfiguration connectSession={connectSession} pipelineId={pipelineId} />
          {/* {certificateError && !errorAcknowledged ? (
                <>
                  <PersistentNotification className={cx(elMb6)} isExpanded intent="danger" isInline>
                    {certificateError}
                  </PersistentNotification>
                  <Button
                    intent="primary"
                    loading={appPipelineState.appPipelineLoading}
                    disabled={appPipelineState.appPipelineLoading}
                    onClick={() => {
                      appPipelineState.appPipelineRefresh()
                      setErrorAcknowledged(true)
                    }}
                  >
                    Restart
                  </Button>
                </>)
            {errorAcknowledged && (
            <PersistentNotification className={cx(elMb6)} isExpanded intent="danger" isInline>
              {certificateError}
            </PersistentNotification> */}
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
