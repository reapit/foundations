import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import {
  Loader,
  BodyText,
  Steps,
  FlexContainer,
  elMr2,
  elMb6,
  Subtitle,
  FormLayout,
  InputWrapHalf,
  Button,
} from '@reapit/elements'
import { cx } from '@linaria/core'
import CopyToClipboard from 'react-copy-to-clipboard'

export const handleCopyCode = (setCopyState: Dispatch<SetStateAction<'value' | undefined>>, key: 'value') => () => {
  setCopyState(key)

  setTimeout(() => {
    setCopyState(undefined)
  }, 5000)
}

export const PipelineDnsStepFour: FC<{ pipelineId: string; customDomain: string }> = ({ pipelineId, customDomain }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [copyState, setCopyState] = useState<'value' | undefined>()

  const [cnameValue, loading] = useReapitGet<string>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.pipelineDnsFetchCname],
    uriParams: {
      pipelineId,
    },
    headers: {
      authorization: `Bearer ${connectSession?.idToken}`,
    },
    fetchWhenTrue: [connectSession],
  })

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FlexContainer className={cx(elMb6)}>
            <Steps className={cx(elMr2)} steps={['3']} selectedStep="3" />
            <Subtitle>CNAME Record</Subtitle>
          </FlexContainer>
          <div className={cx(elMb6)}>
            <BodyText>
              Copy the DNS record value to complete the setup. Once added this setup process is complete and your new
              domain will be active.
            </BodyText>
          </div>

          <FormLayout>
            <InputWrapHalf>
              <Subtitle>Domain</Subtitle>
              <BodyText hasGreyText>{customDomain}</BodyText>
            </InputWrapHalf>
            <InputWrapHalf>
              <Subtitle>Type</Subtitle>
              <BodyText hasGreyText>CNAME</BodyText>
            </InputWrapHalf>
            <InputWrapHalf>
              <Subtitle>DNS Record Value</Subtitle>
              <BodyText hasGreyText>{cnameValue}</BodyText>
              <CopyToClipboard text={cnameValue} onCopy={handleCopyCode(setCopyState, 'value')}>
                <Button intent="default">{copyState === 'value' ? 'Copied' : 'Copy'}</Button>
              </CopyToClipboard>
            </InputWrapHalf>
          </FormLayout>
        </>
      )}
    </>
  )
}
