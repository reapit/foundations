import React, { useEffect } from 'react'
import { ModalV2, Formik, Input, Form, Content, Loader, Button, Info } from '@reapit/elements'
import { getParamsFromPath } from '@/utils/client-url-params'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDeveloperDetails, fetchMemberDetails } from '@/actions/developers'
import {
  selectDeveloperDetails,
  selectDeveloperDetailsLoading,
  selectMemberDetails,
  selectMemberDetailsLoading,
  selectInviteMemberStatus,
} from '@/selector/developers'
import { acceptInviteMember, rejectInviteMember } from '@/actions/developers'
import AcceptedModal from './accepted'
import RejectedModal from './rejected'
import { InviteMemberStatus } from '@/reducers/developers/member-details'
import { Dispatch } from 'redux'

export const handleFetchDeveloperData = (dispatch: Dispatch, developerId: string, memberId: string) => () => {
  dispatch(fetchDeveloperDetails({ id: developerId }))
  dispatch(fetchMemberDetails({ memberId, developerId }))
}

export const handleSubmit = (dispatch: Dispatch, developerId: string, memberId: string) => values => {
  const params = {
    developerId,
    memberId,
    ...values,
  }
  dispatch(acceptInviteMember(params))
}

export const handleReject = (dispatch: Dispatch, developerId: string, memberId: string) => () => {
  const params = {
    developerId,
    memberId,
  }
  dispatch(rejectInviteMember(params))
}

export interface FooterModalProps {
  onConfirm: () => void
  onReject: () => void
  inviteStatus: InviteMemberStatus
}

export const FooterModal: React.FC<FooterModalProps> = ({ onConfirm, onReject, inviteStatus }) => {
  const isDisabled = inviteStatus == 'REJECTING' || inviteStatus == 'ACCEPTING'
  return (
    <>
      <Button
        className="mr-2"
        loading={inviteStatus === 'REJECTING'}
        disabled={isDisabled}
        key="close"
        type="button"
        variant="danger"
        onClick={onReject}
      >
        Decline
      </Button>
      <Button
        variant="primary"
        loading={inviteStatus === 'ACCEPTING'}
        disabled={isDisabled}
        key="submit"
        type="submit"
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </>
  )
}

export const Invite: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const queryParams = getParamsFromPath(location.search)
  const { developerId, memberId } = queryParams

  useEffect(handleFetchDeveloperData(dispatch, developerId, memberId), [dispatch, developerId, memberId])

  const developerDetails = useSelector(selectDeveloperDetails)
  const developerDetailsLoading = useSelector(selectDeveloperDetailsLoading)
  const memberDetails = useSelector(selectMemberDetails)
  const memberDetailsLoading = useSelector(selectMemberDetailsLoading)
  const inviteStatus = useSelector(selectInviteMemberStatus)

  const { company = '' } = developerDetails || {}
  const { name = '', jobTitle = '' } = memberDetails || {}

  const loading = developerDetailsLoading || memberDetailsLoading
  const noData = !developerDetails || !memberDetails

  if (loading) return <Loader />
  if (!loading && noData) return <Info infoType="404" />

  const onSubmit = handleSubmit(dispatch, developerId, memberId)
  const onReject = handleReject(dispatch, developerId, memberId)

  const isFormVisible = ['PENDING', 'ACCEPTING', 'REJECTING', 'ERROR'].includes(inviteStatus)

  return (
    <>
      {isFormVisible && (
        <Formik initialValues={{ name, jobTitle }} onSubmit={onSubmit}>
          {({ handleSubmit }) => {
            return (
              <Form>
                <ModalV2
                  title="Reapit Foundations Invitation"
                  visible
                  isCentered
                  isResponsive
                  footer={<FooterModal onConfirm={handleSubmit} onReject={onReject} inviteStatus={inviteStatus} />}
                >
                  <Content>
                    <p>You have been invited to join the &apos;{company}&apos; organisation on Reapit Foundations.</p>
                    <p>Before confirming your account, please ensure your details are correct below.</p>
                  </Content>
                  <Input type="text" name="name" id="name" required labelText="Name"></Input>
                  <Input type="text" name="jobTitle" id="jobTitle" required labelText="Job Title"></Input>
                  <Content>
                    <p>
                      <strong>Important: </strong>If you already have an account and confirm this invitation, any data
                      on your existing account will no longer be available.
                    </p>
                  </Content>
                </ModalV2>
              </Form>
            )
          }}
        </Formik>
      )}
      <AcceptedModal visible={inviteStatus === 'ACCEPTED'} />
      <RejectedModal visible={inviteStatus === 'REJECTED'} />
    </>
  )
}

export default Invite
