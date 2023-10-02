import React, { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { AcceptInviteModel } from '@reapit/foundations-ts-definitions'
import { getParamsFromPath, letterNumberSpaceRegex, personNameRegex } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import { BodyText, ButtonGroup, Button, FormLayout, InputWrap, InputGroup, useSnack, Modal } from '@reapit/elements'
import { yupResolver } from '@hookform/resolvers/yup'
import Routes from '../../../constants/routes'
import { object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { acceptInviteService, rejectInviteService } from '../../../services/developer'
import { specialCharsTest } from '../../../utils/yup'
import { navigateRoute } from '../../../utils/navigation'

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH } = errorMessages

export type InviteState = 'DEFAULT' | 'LOADING' | 'ACCEPT_SUCCESS' | 'REJECT_SUCCESS'

export const validationSchema = object().shape({
  name: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(personNameRegex, 'Full name is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256))
    .test(specialCharsTest),

  jobTitle: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, 'Job title is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256))
    .test(specialCharsTest),
})

export const handleAccept =
  (
    error: (message: string) => void,
    setInviteState: Dispatch<SetStateAction<InviteState>>,
    developerId?: string,
    memberId?: string,
  ) =>
  async (values: AcceptInviteModel) => {
    if (!developerId || !memberId) return

    setInviteState('LOADING')

    const response = await acceptInviteService(values, developerId, memberId)

    if (typeof response === 'string') {
      error(response)
      setInviteState('DEFAULT')
    } else {
      setInviteState('ACCEPT_SUCCESS')
    }
  }

export const handleReject =
  (
    error: (message: string) => void,
    setInviteState: Dispatch<SetStateAction<InviteState>>,
    developerId?: string,
    memberId?: string,
  ) =>
  async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (!developerId || !memberId) return

    setInviteState('LOADING')

    const response = await rejectInviteService(developerId, memberId)

    if (typeof response === 'string') {
      error(response)
      setInviteState('DEFAULT')
    } else {
      setInviteState('REJECT_SUCCESS')
    }
  }

export const Invite: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { error } = useSnack()
  const [inviteState, setInviteState] = useState<InviteState>('DEFAULT')
  const queryParams = getParamsFromPath(location.search)
  const { developerId, memberId, memberName: name, memberJobTitle: jobTitle, organisationName: company } = queryParams

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

  const onSubmit = handleSubmit(handleAccept(error, setInviteState, developerId, memberId))
  const onReject = handleReject(error, setInviteState, developerId, memberId)
  const isLoading = inviteState === 'LOADING'
  const title =
    inviteState === 'ACCEPT_SUCCESS'
      ? 'Invite Accepted'
      : inviteState === 'REJECT_SUCCESS'
      ? 'Invite Rejected'
      : 'Reapit Foundations Invitation'

  return (
    <Modal title={title} isOpen={true} onModalClose={console.log}>
      {!inviteState.includes('SUCCESS') && (
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
            <FormLayout hasMargin>
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
            <ButtonGroup alignment="right">
              <Button
                fixedWidth
                intent="danger"
                loading={isLoading}
                disabled={isLoading}
                type="button"
                onClick={onReject}
              >
                Decline
              </Button>
              <Button intent="primary" loading={isLoading} disabled={isLoading} type="submit">
                Confirm
              </Button>
            </ButtonGroup>
          </form>
        </>
      )}
      {inviteState === 'ACCEPT_SUCCESS' && (
        <>
          <BodyText>Thank you for confirming your invite to Reapit Foundations.</BodyText>
          <BodyText>
            If you already had a Developer account, you can use your existing credentials to login to the Developers
            Portal. If not, you will shortly receive an email with instructions on setting up your login credentials.
          </BodyText>
          <ButtonGroup alignment="right">
            <Button intent="primary" onClick={navigateRoute(navigate, Routes.LOGIN)}>
              Login
            </Button>
          </ButtonGroup>
        </>
      )}
      {inviteState === 'REJECT_SUCCESS' && (
        <BodyText>You have successfully declined the invitation to Reapit Foundations.</BodyText>
      )}
    </Modal>
  )
}

export default Invite
