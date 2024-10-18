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
} from '@reapit/elements'
import { useAppState } from '../state/use-app-state'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as Yup from 'yup'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'

export const validationSchema = Yup.object().shape({
  customDomain: Yup.string().url().trim().required(),
})

const PipelineDnsStepModal: FC<{ customDomain?: string; buttonText?: string; pipelineId: string }> = ({
  customDomain,
  buttonText = 'Edit DNS',
  pipelineId,
}) => {
  const { modalIsOpen, closeModal, openModal } = useModal()

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

  const {} = useReapitUpdate({
    action: updateActions[UpdateActionNames.createCustomPipelineDnsRecord],
    method: 'POST',
    headers: {},
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
          onSubmit={handleSubmit((values) => {
            console.log('values', values)
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
              <Button intent="primary">Next</Button>
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
              <Button intent="primary">Verify Record</Button>
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

  const step = domainVerified
    ? 'verified'
    : (!verifyDnsName || !verifyDnsValue) && customDomain
      ? 'setup'
      : 'not-started'

  console.log('step', step)

  // const [fetchedKeys, isFetching] = useReapitGet<string[]>({
  //   reapitConnectBrowserSession,
  //   action: getActions[GetActionNames.getPipelineEnvironment],
  //   uriParams: {
  //     pipelineId: appId,
  //   },
  //   headers: {
  //     Authorization: connectSession?.idToken as string,
  //   },
  //   fetchWhenTrue: [connectSession?.idToken],
  // })

  // const setupCustomDns = async () => {

  // }

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
