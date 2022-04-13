import React from 'react'
import { ModalV2, Formik, Input, Form, Content, Button } from '@reapit/elements-legacy'
import { useLocation } from 'react-router'
import AcceptedModal from './accepted'
import RejectedModal from './rejected'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { AcceptInviteModel } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { getParamsFromPath, UpdateActionNames, updateActions } from '@reapit/utils-common'

export const handleSubmit = (acceptInvite: SendFunction<AcceptInviteModel, boolean>) => (values: AcceptInviteModel) => {
  acceptInvite(values)
}

export const handleReject = (rejectInvite: SendFunction<undefined, boolean>) => () => {
  rejectInvite(undefined)
}

export interface ModalFooterProps {
  onConfirm: () => void
  onReject: () => void
  isLoading: boolean
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ onConfirm, onReject, isLoading }) => {
  return (
    <>
      <Button
        className="mr-2"
        loading={isLoading}
        disabled={isLoading}
        key="close"
        type="button"
        variant="danger"
        onClick={onReject}
      >
        Decline
      </Button>
      <Button variant="primary" loading={isLoading} disabled={isLoading} key="submit" type="submit" onClick={onConfirm}>
        Confirm
      </Button>
    </>
  )
}

export const Invite: React.FC = () => {
  const location = useLocation()
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

  const onSubmit = handleSubmit(acceptInvite)
  const onReject = handleReject(rejectInvite)

  return (
    <>
      {!acceptInviteSuccess && !rejectInviteSuccess && (
        <Formik initialValues={{ name, jobTitle }} onSubmit={onSubmit}>
          {({ handleSubmit }) => {
            return (
              <ModalV2
                title="Reapit Foundations Invitation"
                visible
                isCentered
                closable={false}
                footer={
                  <ModalFooter
                    onConfirm={handleSubmit}
                    onReject={onReject}
                    isLoading={Boolean(acceptingInvite || rejectingInvite)}
                  />
                }
              >
                <Content>
                  <p>You have been invited to join the &apos;{company}&apos; organisation on Reapit Foundations.</p>
                  <p>Before confirming your account, please ensure your details are correct below.</p>
                </Content>
                <Form>
                  <Input type="text" name="name" id="name" required labelText="Name"></Input>
                  <Input type="text" name="jobTitle" id="jobTitle" required labelText="Job Title"></Input>
                </Form>
                <Content>
                  <p>
                    <strong>Important: </strong>If you already have an account and confirm this invitation, any data on
                    your existing account will no longer be available.
                  </p>
                </Content>
              </ModalV2>
            )
          }}
        </Formik>
      )}
      <AcceptedModal visible={Boolean(acceptInviteSuccess)} />
      <RejectedModal visible={Boolean(rejectInviteSuccess)} />
    </>
  )
}

export default Invite
