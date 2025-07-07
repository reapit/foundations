import React, { FC, useState } from 'react'
import { BodyText, Button, ButtonGroup, FormLayout, InputGroup, InputWrapFull, Modal } from '@reapit/elements'
import { useForm } from 'react-hook-form'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { SchemaOf, object, string } from 'yup'
import { hasSpecialChars } from '@reapit/utils-common'
import { yupResolver } from '@hookform/resolvers/yup'

const uninstallAppSchema: SchemaOf<Pick<Marketplace.TerminateInstallationModel, 'terminatedReason'>> = object().shape({
  terminatedReason: string()
    .trim()
    .required('Required')
    .min(10, 'Must be a minimum of 10 characters')
    .test({
      name: 'hasNoSpecialChars',
      message: 'Special characters are not permitted',
      test: (value?: string) => {
        if (!value) return true
        return !hasSpecialChars(value)
      },
    }),
})

export const UninstallModal: FC<{
  installationId: string | undefined
  appId: string | undefined
  onClose: () => void
  installationRefresh: () => void
}> = ({ installationId, appId, onClose, installationRefresh }) => {
  const [uninstalling, setUninstalling] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [, , uninstallApp] = useReapitUpdate<Marketplace.TerminateInstallationModel, null>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.terminateInstallation],
    uriParams: {
      installationId,
    },
  })

  const uninstallAction = async ({ terminatedReason }: { terminatedReason: string }) => {
    setUninstalling(true)
    const result = await uninstallApp({
      appId: appId as string,
      terminatedBy: connectSession?.loginIdentity.email,
      terminatedReason,
      terminatesOn: new Date().toISOString(),
    })
    setUninstalling(false)

    if (result) {
      installationRefresh()
      onClose()
    }
  }

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: yupResolver(uninstallAppSchema),
    defaultValues: {
      terminatedReason: '',
    },
  })

  return (
    <Modal
      isOpen={appId !== undefined && installationId !== undefined}
      onModalClose={() => {
        if (!uninstalling) {
          reset()
          onClose()
        }
      }}
      title="Confirm Uninstallation"
    >
      <BodyText>Please provide a reason for terminating this installation</BodyText>
      <form onSubmit={handleSubmit(uninstallAction)}>
        <FormLayout hasMargin>
          <InputWrapFull>
            <InputGroup
              label="Uninstallation Reason"
              type="text"
              {...register('terminatedReason')}
              inputAddOnText={errors.terminatedReason?.message}
              intent="danger"
            />
          </InputWrapFull>
        </FormLayout>
        <ButtonGroup alignment="right">
          <Button disabled={uninstalling} loading={uninstalling} intent="danger" type="submit">
            Uninstall
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  )
}
