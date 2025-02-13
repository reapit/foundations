import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  elMb6,
  FormLayout,
  InputGroup,
  InputWrapFull,
  Modal,
  PersistentNotification,
  Subtitle,
  useModal,
} from '@reapit/elements'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useAppState } from '../../state/use-app-state'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import * as Yup from 'yup'

const domainRegex = new RegExp(
  /^([a-z0-9])(([a-z0-9-]{1,61})?[a-z0-9]{1})?(\.[a-z0-9](([a-z0-9-]{1,61})?[a-z0-9]{1})?)?(\.[a-zA-Z]{2,4})+$/,
)

export const validationSchema = Yup.object().shape({
  customDomain: Yup.string().matches(domainRegex, 'Should be a valid domain').trim().required(),
})

export const PipelineDnsStepModal: FC<{ customDomain?: string; buttonText?: string; pipelineId: string }> = ({
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
                label="domain name"
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
