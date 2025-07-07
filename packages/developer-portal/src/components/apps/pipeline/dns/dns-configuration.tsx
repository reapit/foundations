import { BodyText, elMb6, Loader } from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { ReapitConnectSession } from '@reapit/connect-session'
import { cx } from '@linaria/core'
import { PipelineDnsStepModal } from './setup-model'
import { DnsSettingsPage } from './dns-settings-page'

export const DnsConfiguration: FC<{
  connectSession: ReapitConnectSession
  pipelineId: string
  certificateError?: string
  certificateStatus: string
}> = ({ connectSession, pipelineId, certificateError, certificateStatus }) => {
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
    dnsInfo && !certificateError ? (
      <DnsSettingsPage dnsInfo={dnsInfo} certificateStatus={certificateStatus} />
    ) : (
      <>
        <div className={cx(elMb6)}>
          <BodyText hasGreyText>
            To attach a custom domain to your IaaS project, use the button below to start the setup process. Once the
            process has completed, you will be presented with the DNS records you need to add to your domain&apos;s DNS
            settings for both domain ownership verification and domain routing.
          </BodyText>
        </div>
        <PipelineDnsStepModal buttonText="Setup Custom DNS" pipelineId={pipelineId} refresh={refresh} />
      </>
    )
  ) : (
    <Loader />
  )
}
