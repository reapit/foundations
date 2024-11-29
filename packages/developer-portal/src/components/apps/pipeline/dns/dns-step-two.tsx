import { useReapitConnect } from '@reapit/connect-session'
import { BodyText, Button, ButtonGroup, FormLayout, InputWrapFull, Label, Subtitle, useSnack } from '@reapit/elements'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { PipelineDnsStepModal } from './setup-model'
import { useAppState } from '../../state/use-app-state'

export const PipelineDnsStepTwo: FC<{
  customDomain: string
  verifyDnsValue
  pipelineId: string
  verifyDnsName: string
}> = ({ customDomain, verifyDnsValue, verifyDnsName, pipelineId }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [sendingVerify, verifyResults, sendVerifyRequest] = useReapitUpdate<
    undefined,
    { result: 'success' | 'failed'; reason?: string }
  >({
    action: updateActions[UpdateActionNames.verifyPipelineDnsRecord],
    method: 'POST',
    headers: {
      authorization: `Bearer ${connectSession?.idToken}`,
    },
    reapitConnectBrowserSession,
    uriParams: { pipelineId },
  })
  const { error, success } = useSnack()
  const { appPipelineState } = useAppState()

  const verifyTxtRecord = async () => {
    const result = await sendVerifyRequest(undefined)
    const defaultError = 'Unknown error, check your TXT record is correctly set'

    console.log('result', verifyResults)

    if (!verifyResults) {
      return
    }

    // TODO check for 422 already verified?
    if (verifyResults.result === 'failed') {
      error(verifyResults.reason || defaultError)
    } else if (verifyResults.result === 'success') {
      success('Verified TXT record')
      appPipelineState.appPipelineRefresh()
    } else {
      error(defaultError)
    }
  }

  return (
    <>
      <Subtitle>Step 2</Subtitle>
      <BodyText>Use the Text Record Value below to create a TXT record against your configured domain name.</BodyText>
      <BodyText>
        Once you&apos;ve added that TXT record. Click the &ldquo;Verify Record&rdquo; button below to begin verifying
        your domain.
      </BodyText>
      <>
        <FormLayout>
          <InputWrapFull>
            <Label>Domain</Label>
            <BodyText>{customDomain}</BodyText>
          </InputWrapFull>
          <InputWrapFull>
            <Label>Text Record Name</Label>
            <BodyText>{verifyDnsName}</BodyText>
          </InputWrapFull>
          <InputWrapFull>
            <Label>Text Record Value</Label>
            <BodyText>{verifyDnsValue}</BodyText>
          </InputWrapFull>
          <InputWrapFull>
            <ButtonGroup>
              <Button
                loading={sendingVerify}
                disabled={sendingVerify}
                onClick={() => {
                  verifyTxtRecord()
                }}
                intent="primary"
              >
                Verify Record
              </Button>
              <PipelineDnsStepModal customDomain={customDomain} buttonText="Edit Domain" pipelineId={pipelineId} />
            </ButtonGroup>
          </InputWrapFull>
        </FormLayout>
      </>
    </>
  )
}
