import React, { FC, MouseEvent } from 'react'
import { useHistory, useLocation } from 'react-router'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { AcceptInviteModel } from '@reapit/foundations-ts-definitions'
import { History } from 'history'
import { ReapitConnectHook, useReapitConnect } from '@reapit/connect-session'
import {
  getParamsFromPath,
  letterNumberSpaceRegex,
  personNameRegex,
  UpdateActionNames,
  updateActions,
} from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import {
  ModalBg,
  elIsActive,
  ModalContainer,
  ModalBody,
  BodyText,
  ModalHeader,
  ButtonGroup,
  Button,
  FormLayout,
  InputWrap,
  InputGroup,
} from '@reapit/elements'
import { yupResolver } from '@hookform/resolvers/yup'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import Routes from '../../../constants/routes'
import { object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH } = errorMessages

export const validationSchema = object().shape({
  name: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(personNameRegex, 'Full name is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),

  jobTitle: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, 'Job title is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),
})

export const handleSubmit = (acceptInvite: SendFunction<AcceptInviteModel, boolean>) => (values: AcceptInviteModel) => {
  acceptInvite(values)
}

export const handleReject =
  (rejectInvite: SendFunction<undefined, boolean>) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    rejectInvite(undefined)
  }

export const handleLogin = (history: History, session: ReapitConnectHook) => () => {
  const { connectHasSession, connectLogoutRedirect } = session
  if (connectHasSession) {
    connectLogoutRedirect()
    return
  }
  history.replace(Routes.LOGIN)
}

export const Invite: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const session = useReapitConnect(reapitConnectBrowserSession)
  const queryParams = getParamsFromPath(location.search)
  const { developerId, memberId, memberName: name, memberJobTitle: jobTitle, organisationName: company } = queryParams

  const [, acceptingInvite, acceptInvite, acceptInviteSuccess] = useReapitUpdate<AcceptInviteModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.acceptInviteMember],
    method: 'POST',
    uriParams: {
      developerId,
      memberId,
    },
  })

  const [, rejectingInvite, rejectInvite, rejectInviteSuccess] = useReapitUpdate<undefined, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.rejectInviteMember],
    method: 'POST',
    uriParams: {
      developerId,
      memberId,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInviteModel>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name,
      jobTitle,
    },
  })

  const onSubmit = handleSubmit(acceptInvite)
  const onReject = handleReject(rejectInvite)
  const isLoading = acceptingInvite || rejectingInvite
  const title = acceptInviteSuccess
    ? 'Invite Accepted'
    : rejectInviteSuccess
    ? 'Invite Rejected'
    : 'Reapit Foundations Invitation'

  return (
    <>
      <ModalBg className={elIsActive} />
      <ModalContainer className={elIsActive}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {Boolean(!acceptInviteSuccess && !rejectInviteSuccess) && (
            <>
              <BodyText>
                You have been invited to join the &apos;{company}&apos; organisation on Reapit Foundations.
              </BodyText>
              <BodyText>Before confirming your account, please ensure your details are correct below.</BodyText>
              <BodyText>
                <strong>Important: </strong>If you already have an account and confirm this invitation, any data on your
                existing account will no longer be available.
              </BodyText>
              <form onSubmit={onSubmit}>
                <FormLayout>
                  <InputWrap>
                    <InputGroup
                      {...register('name')}
                      label="Name"
                      errorMessage={errors.name?.message}
                      icon={errors.name?.message ? 'asteriskSystem' : null}
                      intent="danger"
                    />
                  </InputWrap>
                  <InputWrap>
                    <InputGroup
                      {...register('jobTitle')}
                      label="Job Title"
                      errorMessage={errors.jobTitle?.message}
                      icon={errors.jobTitle?.message ? 'asteriskSystem' : null}
                      intent="danger"
                    />
                  </InputWrap>
                </FormLayout>
                <ButtonGroup alignment="center">
                  <Button intent="danger" loading={isLoading} disabled={isLoading} type="button" onClick={onReject}>
                    Decline
                  </Button>
                  <Button intent="primary" loading={isLoading} disabled={isLoading} type="submit" onClick={onReject}>
                    Confirm
                  </Button>
                </ButtonGroup>
              </form>
            </>
          )}
          {acceptInviteSuccess && (
            <>
              <BodyText>Thank you for confirming your invite to Reapit Foundations.</BodyText>
              <BodyText>
                If you already had a Developer account, you can use your existing credentials to login to the Developers
                Portal. If not, you will shortly receive an email with instructions on setting up your login
                credentials.
              </BodyText>
              <ButtonGroup alignment="center">
                <Button intent="primary" onClick={handleLogin(history, session)}>
                  Login
                </Button>
              </ButtonGroup>
            </>
          )}
          {rejectInviteSuccess && (
            <BodyText>You have successfully declined the invitation to Reapit Foundations.</BodyText>
          )}
        </ModalBody>
      </ModalContainer>
    </>
  )
}

export default Invite
