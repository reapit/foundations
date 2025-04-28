import { useReapitConnect } from '@reapit/connect-session'
import { BodyText, Button, FormLayout, InputGroup, InputWrapFull, Modal, Subtitle, useModal } from '@reapit/elements'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useAppState } from '../../state/use-app-state'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import * as Yup from 'yup'

const domainRegex = new RegExp(/([a-z0-9|-]+\.)*[a-z0-9|-]+\.[a-z]+/)

export const validationSchema = Yup.object().shape({
  customDomain: Yup.string().matches(domainRegex, 'Should be a valid domain').trim().required(),
})

export const PipelineDnsStepModal: FC<{
  customDomain?: string
  buttonText?: string
  pipelineId: string
  refresh: () => void
}> = ({ customDomain, buttonText = 'Edit DNS', pipelineId, refresh }) => {
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

  const [sendingDns, dnsInfo, sendDnsRequest] = useReapitUpdate<
    { customDomain: string },
    { cloudfrontUrl: string; certificate: string; customDomain: string }
  >({
    action: updateActions[UpdateActionNames.createCustomPipelineDnsRecord],
    method: 'POST',
    headers: {
      authorization: `Bearer ${connectSession?.idToken}`,
    },
    reapitConnectBrowserSession,
    uriParams: { pipelineId },
  })

  if (dnsInfo) refresh()

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
              appPipelineState.appPipelineRefresh()
              closeModal()
            }
          })}
        >
          <FormLayout>
            <InputWrapFull>
              <BodyText>
                Enter the domain name you wish to use, this domain will be used to verify you have access to the DNS
                records.
              </BodyText>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup
                {...register('customDomain')}
                label="Domain Name"
                placeholder="my.domain.com"
                errorMessage={errors.customDomain?.message}
              />
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
