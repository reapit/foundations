import React, { FC } from 'react'
import { useAppState } from '../../state/use-app-state'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineTabs } from '../pipeline-tabs'
import { PipelineDnsStepThree } from './dns-step-three'
import { PipelineDnsStepOne } from './dns-step-one'
import { Loader, PersistentNotification, Subtitle } from '@reapit/elements'
import { PipelineDnsStepTwo } from './dns-step-two'
import { PipelineDnsStepFour } from './dns-step-four'

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
  const { appId } = useAppState()
  const { appPipelineState } = useAppState()

  const { domainVerified, verifyDnsName, verifyDnsValue, customDomain, certificateStatus, buildStatus } =
    appPipelineState.appPipeline as PipelineModelInterface & {
      domainVerified: string
      verifyDnsName: string
      verifyDnsValue: string
      customDomain: string
      certificateStatus: string
    }

  const step = resolveStep({ domainVerified, verifyDnsValue, customDomain, certificateStatus })

  return (
    <>
      <PipelineTabs />
      <Subtitle> Custom DNS Configuration</Subtitle>
      {buildStatus && ['READY_FOR_DEPLOYMENT', 'FAILED', 'SUCCEEDED'].includes(buildStatus) ? (
        <>
          {appId ? (
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
