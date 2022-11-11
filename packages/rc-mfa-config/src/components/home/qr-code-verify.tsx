import React, { useEffect, FC, MutableRefObject, useRef } from 'react'
import {
  Button,
  ButtonGroup,
  elMb7,
  elMxAuto,
  FlexContainer,
  FormLayout,
  InputGroup,
  InputWrapFull,
  PersistentNotification,
  useModal,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import QRCode from 'qrcode'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import { cx } from '@linaria/core'
import { CreateAuthenticatorReturnType } from '.'

interface QrCodeVerifyProps {
  refreshAuthenticators: () => void
  qrCodeResponse?: CreateAuthenticatorReturnType
}

interface VerifyQrCodeType {
  code: string
}

export const validationSchema = object().shape({
  code: string().max(6).min(6).required('Must be a 6 digit code'),
})

export const handleVerifyQrCode =
  (verifyQrCode: SendFunction<VerifyQrCodeType, boolean>) => (formValues: VerifyQrCodeType) => {
    verifyQrCode(formValues)
  }

export const handleDrawQrCode =
  (
    modalIsOpen: boolean,
    canvasRef: MutableRefObject<HTMLCanvasElement | null>,
    qrCodeResponse?: CreateAuthenticatorReturnType,
  ) =>
  () => {
    if (modalIsOpen && canvasRef?.current && qrCodeResponse) {
      const qrCode = `otpauth://totp/Reapit%20Connect?secret=${qrCodeResponse.secret}&issuer=Reapit`
      QRCode.toCanvas(canvasRef.current, qrCode, (error) => {
        if (error) console.error(error)
      })
    }
  }

export const handleOpenModal = (openModal: () => void, qrCodeResponse?: CreateAuthenticatorReturnType) => () => {
  if (qrCodeResponse) {
    openModal()
  }
}

export const handleRefresh =
  (refreshAuthenticators: () => void, closeModal: () => void, hasVerified?: boolean) => () => {
    if (hasVerified) {
      closeModal()
      refreshAuthenticators()
    }
  }

export const QrCodeVerify: FC<QrCodeVerifyProps> = ({ refreshAuthenticators, qrCodeResponse }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { Modal, openModal, closeModal, modalIsOpen } = useModal()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const email = connectSession?.loginIdentity.email
  const userId = email ? window.btoa(email.toLowerCase()).replace(/=/g, '') : null

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyQrCodeType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      code: '',
    },
  })

  const [qrCodeVerifyLoading, , verifyQrCode, hasVerified] = useReapitUpdate<VerifyQrCodeType, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.verifyUserAuthenticator],
    method: 'POST',
    uriParams: {
      userId,
      authenticatorId: qrCodeResponse?.id,
    },
  })

  useEffect(handleDrawQrCode(modalIsOpen, canvasRef, qrCodeResponse), [canvasRef, qrCodeResponse, modalIsOpen])
  useEffect(handleOpenModal(openModal, qrCodeResponse), [qrCodeResponse])
  useEffect(handleRefresh(refreshAuthenticators, closeModal, hasVerified), [hasVerified])

  return (
    <Modal title="Scan QR Code">
      <PersistentNotification className={elMb7} isFullWidth isExpanded isInline intent="secondary">
        Scan the below QR Code in an authenticator app of your choice. We recommend Microsoft Authenticator, Google
        Authenticator or a password manager like 1Password or LastPass.
      </PersistentNotification>
      <FlexContainer isFlexJustifyCenter>
        <canvas className={cx(elMb7, elMxAuto)} ref={canvasRef} />
      </FlexContainer>
      <form onSubmit={handleSubmit(handleVerifyQrCode(verifyQrCode))}>
        <PersistentNotification className={elMb7} isFullWidth isExpanded isInline intent="secondary">
          Enter the code from your authenticator app below and hit submit to complete configuration of MFA.
        </PersistentNotification>
        <FormLayout className={elMb7}>
          <InputWrapFull>
            <InputGroup
              label="Authenticator Code"
              {...register('code')}
              errorMessage={errors?.code?.message}
              icon={errors?.code?.message ? 'asteriskSystem' : null}
              intent="danger"
            />
          </InputWrapFull>
        </FormLayout>
        <ButtonGroup alignment="center">
          <Button intent="low" onClick={closeModal}>
            Cancel
          </Button>
          <Button intent="primary" type="submit" loading={qrCodeVerifyLoading} disabled={qrCodeVerifyLoading}>
            Submit Code
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  )
}
