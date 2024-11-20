import React, { FC } from 'react'
import { useAppState } from '../../state/use-app-state'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineTabs } from '../pipeline-tabs'
import { PipelineDnsStepThree } from './dns-step-three'
import { PipelineDnsStepOne } from './dns-step-one'
import { Loader, Subtitle } from '@reapit/elements'
import { PipelineDnsStepTwo } from './dns-step-two'

export const PipelineDns: FC<{}> = () => {
  const { appId } = useAppState()
  const { appPipelineState } = useAppState()

  const { domainVerified, verifyDnsName, verifyDnsValue, customDomain } =
    appPipelineState.appPipeline as PipelineModelInterface & {
      domainVerified: string
      verifyDnsName: string
      verifyDnsValue: string
      customDomain: string
    }

  console.log('test', { domainVerified, verifyDnsName, verifyDnsValue, customDomain })

  const step = domainVerified ? 'verified' : verifyDnsValue && customDomain ? 'setup' : 'not-started'

  console.log('step', step)

  return (
    <>
      <PipelineTabs />
      <Subtitle> Custom DNS Configuration</Subtitle>
      {appId ? (
        step === 'verified' ? (
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
  )
}
