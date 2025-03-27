import React, { FC, useState } from 'react'
import { useAppState } from '../../state/use-app-state'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineTabs } from '../pipeline-tabs'
import { PipelineDnsStepThree } from './dns-step-three'
import { PipelineDnsStepOne } from './dns-step-one'
import { Button, elMb6, Loader, PersistentNotification, Subtitle } from '@reapit/elements'
import { PipelineDnsStepTwo } from './dns-step-two'
import { PipelineDnsStepFour } from './dns-step-four'
import { cx } from '@linaria/core'

const resolveStep = ({
  domainVerified,
  certificateStatus,
  verifyDnsValue,
  customDomain,
}: {
  domainVerified: string
  certificateStatus: string
  verifyDnsValue: string
  customDomain: string
}): 'complete' | 'verified' | 'start' | 'not-started' => {
  if (domainVerified && certificateStatus === 'complete') return 'complete'
  else if (domainVerified) return 'verified'
  else if (verifyDnsValue && customDomain) return 'start'
  else if (customDomain) return 'start'
  return 'not-started'
}

export const PipelineDns: FC<{}> = () => {
  const { appId, appPipelineState } = useAppState()
  const [errorAcknowledged, setErrorAcknowledged] = useState<boolean>(false)

  const {
    domainVerified,
    verifyDnsName,
    verifyDnsValue,
    customDomain,
    certificateStatus,
    buildStatus,
    certificateError,
  } = appPipelineState.appPipeline as PipelineModelInterface & {
    domainVerified: string
    verifyDnsName: string
    verifyDnsValue: string
    customDomain: string
    certificateStatus: string
    certificateError: string
  }

  const step = resolveStep({ domainVerified, verifyDnsValue, customDomain, certificateStatus })

  console.log('pipelineDNS')
  console.table({
    step,
    domainVerified,
    verifyDnsValue,
    customDomain,
    certificateStatus,
  })

  return (
    <>
      <PipelineTabs />
      {errorAcknowledged && (
        <PersistentNotification className={cx(elMb6)} isExpanded intent="danger" isInline>
          {certificateError}
        </PersistentNotification>
      )}
      <Subtitle> Custom DNS Configuration</Subtitle>
      {buildStatus && ['READY_FOR_DEPLOYMENT', 'FAILED', 'SUCCEEDED'].includes(buildStatus) ? (
        <>
          {certificateError && !errorAcknowledged ? (
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
            </>
          ) : appId ? (
            step === 'complete' ? (
              <PipelineDnsStepFour pipelineId={appId} customDomain={customDomain} />
            ) : step === 'verified' ? (
              <PipelineDnsStepThree
                pipelineId={appId}
                verifyDnsName={verifyDnsName}
                customDomain={customDomain}
                verifyDnsValue={verifyDnsValue}
              />
            ) : step === 'not-started' ? (
              <PipelineDnsStepOne pipelineId={appId} />
            ) : (
              <PipelineDnsStepTwo
                pipelineId={appId}
                verifyDnsValue={verifyDnsValue}
                customDomain={customDomain}
                verifyDnsName={verifyDnsName}
              />
            )
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <PersistentNotification isExpanded={true} isInline intent="danger">
          Ensure your app has been provisioned before configuring your DNS.
        </PersistentNotification>
      )}
    </>
  )
}
