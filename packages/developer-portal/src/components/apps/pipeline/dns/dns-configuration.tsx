import { BodyText, elMb6, Loader } from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { ReapitConnectSession } from '@reapit/connect-session'
import { cx } from '@linaria/core'
import { PipelineDnsStepModal } from './setup-model'
import { DnsSettingsPage } from './dns-settings-page'

export const DnsConfiguration: FC<{ connectSession: ReapitConnectSession; pipelineId: string }> = ({
  connectSession,
  pipelineId,
}) => {
  const [dnsInfo, loading, , refresh] = useReapitGet<{
    customDomain: string
    cloudfrontUrl: string
    certificate: any
  }>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getPipelineDnsConfig],
    headers: {
      authorization: `Bearer ${connectSession?.idToken}`,
    },
    uriParams: { pipelineId },
    fetchWhenTrue: [connectSession],
  })

  return !loading ? (
    dnsInfo ? (
      <DnsSettingsPage dnsInfo={dnsInfo} />
    ) : (
      <>
        <div className={cx(elMb6)}>
          <BodyText hasGreyText>
            To use a custom domain, you&apos;ll need to start this process by using the button below. Once you&apos;ve
            created, you&apos;ll need to inform dev ops to configure your DNS with the details provided by the IaaS
            platform.
          </BodyText>
        </div>
        <PipelineDnsStepModal buttonText="Setup Custom DNS" pipelineId={pipelineId} refresh={refresh} />
      </>
    )
  ) : (
    <Loader />
  )
}
