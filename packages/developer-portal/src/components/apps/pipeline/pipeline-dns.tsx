import React, { FC } from 'react'
import { PipelineTabs } from './pipeline-tabs'
import {
  BodyText,
  Button,
  ButtonGroup,
  FormLayout,
  InputGroup,
  InputWrap,
  InputWrapFull,
  Label,
  Loader,
  Modal,
  PersistentNotification,
  Subtitle,
  elMb6,
  useModal,
  useSnack,
} from '@reapit/elements'
import { useAppState } from '../state/use-app-state'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as Yup from 'yup'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { useReapitConnect } from '@reapit/connect-session'

const domainRegex = new RegExp(
  /^([a-z0-9])(([a-z0-9-]{1,61})?[a-z0-9]{1})?(\.[a-z0-9](([a-z0-9-]{1,61})?[a-z0-9]{1})?)?(\.[a-zA-Z]{2,4})+$/,
)

export const validationSchema = Yup.object().shape({
  customDomain: Yup.string().matches(domainRegex, 'Should be a valid domain').trim().required(),
})

const PipelineDnsStepModal: FC<{ customDomain?: string; buttonText?: string; pipelineId: string }> = ({
  customDomain,
  buttonText = 'Edit DNS',
  pipelineId,
}) => {
  const { modalIsOpen, closeModal, openModal } = useModal()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState } = useAppState()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ customDomain: string }>({
    defaultValues: {
      customDomain,
    },
    resolver: yupResolver(validationSchema),
  })

  const [sendingDns, , sendDnsRequest] = useReapitUpdate({
    action: updateActions[UpdateActionNames.createCustomPipelineDnsRecord],
    method: 'POST',
    headers: {
      authorization: `Bearer ${connectSession?.idToken}`,
    },
    reapitConnectBrowserSession,
    uriParams: { pipelineId },
  })

  return (
    <>
      <Button onClick={() => openModal()} intent="primary">
        {buttonText}
      </Button>

      <Modal isOpen={modalIsOpen} onModalClose={closeModal}>
        <Subtitle>Setup DNS</Subtitle>
        <form
          onSubmit={handleSubmit(async (values) => {
            const result = await sendDnsRequest(values)

            if (result) {
              console.log('result was successful')

              appPipelineState.appPipelineRefresh()
              closeModal()
            }
          })}
        >
          <FormLayout>
            <InputWrapFull>
              <InputGroup {...register('customDomain')} label="domain name" placeholder="https://mydomain.com" />
              {errors && errors.customDomain && (
                <PersistentNotification className={elMb6} isFullWidth isExpanded intent="danger" isInline>
                  {errors.customDomain.message}
                </PersistentNotification>
              )}
            </InputWrapFull>
            <InputWrapFull>
              <Button loading={sendingDns} disabled={sendingDns} intent="primary">
                Next
              </Button>
            </InputWrapFull>
          </FormLayout>
        </form>
      </Modal>
    </>
  )
}

const PipelineDnsStepOne: FC<{ pipelineId }> = ({ pipelineId }) => {
  return (
    <>
      <BodyText>By Clicking the button below, you&apos;ll start the custom DNS process</BodyText>
      <PipelineDnsStepModal buttonText="Setup Custom DNS" pipelineId={pipelineId} />
    </>
  )
}

const PipelineDnsStepTwo: FC<{ customDomain: string; verifyDnsValue; pipelineId: string }> = ({
  customDomain,
  verifyDnsValue,
  pipelineId,
}) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [sendingVerify, verifyResult, sendVerifyRequest] = useReapitUpdate<
    undefined,
    { result: 'sucess' | 'failed'; reason?: string }
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

  const verifyTxtRecord = async () => {
    await sendVerifyRequest(undefined)
    const defaultError = 'Unknown error, check your TXT record is correctly set'

    console.log('result', verifyResult)

    if (!verifyResult) {
      return
    }

    if (verifyResult.result === 'failed') {
      error(verifyResult.reason || defaultError)
    } else if (verifyResult.result === 'sucess') {
      success('Verified TXT record')
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

const PipelineDnsStepThree: FC<{
  verifyDnsName?: string
  verifyDnsValue?: string
  customDomain?: string
}> = ({ verifyDnsValue, customDomain }) => {
  return (
    <>
      <FormLayout>
        <InputWrap>
          <Label>Text Record Value</Label>
          {verifyDnsValue}
        </InputWrap>
        <InputWrap>
          <Label>Domain Name</Label>
          {customDomain}
        </InputWrap>
        <InputWrap>
          <Button>Change</Button>
        </InputWrap>
      </FormLayout>
    </>
  )
}

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
      <Subtitle>Custom DNS Configuration</Subtitle>
      {appId ? (
        step === 'verified' ? (
          <PipelineDnsStepThree />
        ) : step === 'not-started' ? (
          <PipelineDnsStepOne pipelineId={appId} />
        ) : (
          <PipelineDnsStepTwo pipelineId={appId} verifyDnsValue={verifyDnsValue} customDomain={customDomain} />
        )
      ) : (
        <Loader />
      )}
    </>
  )
}
