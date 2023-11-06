import React, { useEffect, FC, MutableRefObject, useRef, Dispatch, SetStateAction } from 'react'
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
import { UpdateActionNames, updateActions, SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import QRCode from 'qrcode'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import { cx } from '@linaria/core'
import { CreateAuthenticatorReturnType } from '.'
import { nativeSessionWrapper } from '../../core/connect-session-native'

interface QrCodeVerifyProps {
  refreshAuthenticators: () => void
  setQrCode: Dispatch<SetStateAction<CreateAuthenticatorReturnType | undefined>>
  qrCode?: CreateAuthenticatorReturnType
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
    qrLabel: string,
    qrCode?: CreateAuthenticatorReturnType,
  ) =>
  () => {
    if (modalIsOpen && canvasRef?.current && qrCode) {
      const code = `otpauth://totp/${qrLabel}?secret=${qrCode.secret}&issuer=Reapit%20Connect`
      QRCode.toCanvas(canvasRef.current, code, (error) => {
        if (error) console.error(error)
      })
    }
  }

export const handleOpenModal = (openModal: () => void, qrCode?: CreateAuthenticatorReturnType) => () => {
  if (qrCode) {
    openModal()
  }
}

export const handleRefresh =
  (
    refreshAuthenticators: () => void,
    closeModal: () => void,
    setQrCode: Dispatch<SetStateAction<CreateAuthenticatorReturnType | undefined>>,
    hasVerified?: boolean,
  ) =>
  () => {
    if (hasVerified) {
      closeModal()
      setQrCode(undefined)
      refreshAuthenticators()
    }
  }

export const QrCodeVerify: FC<QrCodeVerifyProps> = ({ refreshAuthenticators, qrCode, setQrCode }) => {
  const { connectSession } = useReapitConnect(nativeSessionWrapper(reapitConnectBrowserSession))
  const { Modal, openModal, closeModal, modalIsOpen } = useModal()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const email = connectSession?.loginIdentity.email
  const userId = email ? window.btoa(email.toLowerCase()).replace(/=/g, '') : null
  const qrLabel = email ?? 'Reapit%20Connect'

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
    action: updateActions[UpdateActionNames.verifyUserAuthenticator],
    method: 'POST',
    uriParams: {
      userId,
      authenticatorId: qrCode?.id,
    },
  })

  useEffect(handleDrawQrCode(modalIsOpen, canvasRef, qrLabel, qrCode), [canvasRef, qrCode, modalIsOpen, connectSession])
  useEffect(handleOpenModal(openModal, qrCode), [qrCode])
  useEffect(handleRefresh(refreshAuthenticators, closeModal, setQrCode, hasVerified), [hasVerified])

  return (
    <Modal title="Scan QR Code">
      <PersistentNotification className={elMb7} isFullWidth isExpanded isInline intent="primary">
        Scan the below QR Code in an authenticator app of your choice. We recommend Microsoft Authenticator, Google
        Authenticator or a password manager like 1Password or LastPass.
      </PersistentNotification>
      <FlexContainer isFlexJustifyCenter>
        <canvas className={cx(elMb7, elMxAuto)} ref={canvasRef} />
      </FlexContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(handleVerifyQrCode(verifyQrCode))(e)
        }}
      >
        <PersistentNotification className={elMb7} isFullWidth isExpanded isInline intent="primary">
          Enter the code from your authenticator app below and hit submit to complete configuration of MFA.
        </PersistentNotification>
        <FormLayout className={elMb7}>
          <InputWrapFull>
            <InputGroup
              label="Authenticator Code"
              {...register('code')}
              errorMessage={errors?.code?.message}
              icon={errors?.code?.message ? 'asterisk' : null}
              intent="danger"
            />
          </InputWrapFull>
        </FormLayout>
        <ButtonGroup alignment="right">
          <Button type="button" intent="default" onClick={closeModal}>
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
