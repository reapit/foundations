import { useReapitConnect } from '@reapit/connect-session'
import { BodyText, InputGroup, ButtonGroup, Button, Table, elMb6 } from '@reapit/elements'
import {
  useReapitGet,
  useReapitUpdate,
  GetActionNames,
  getActions,
  UpdateActionNames,
  updateActions,
} from '@reapit/use-reapit-data'
import React, { FC, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { selectIsCustomer } from '../../../utils/auth'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { useForm } from 'react-hook-form'
import { object, SchemaOf, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGlobalState } from '../../../core/use-global-state'
import { specialCharsTest } from '../../../utils/yup'

interface SubmitReviewModalProps {
  developer: Marketplace.DeveloperModel
  closeModal: () => void
  refetchDeveloper: () => void
}

const schema: SchemaOf<{ reapitReference: string }> = object().shape({
  reapitReference: string().trim().required(errorMessages.FIELD_REQUIRED).test(specialCharsTest),
  status: string().trim().required(errorMessages.FIELD_REQUIRED).test(specialCharsTest),
})

export const getTitle = (isCustomer: boolean, orgStatus?: string): string => {
  if (orgStatus === 'pending') {
    return 'Account Information is being verified'
  }

  if (!isCustomer) {
    return 'Account Information Required'
  }

  return 'Account Verification'
}

export const handleCloseModal =
  (closeModal: () => void, refetchDeveloper: () => void, updateDeveloperSuccess?: boolean) => () => {
    if (updateDeveloperSuccess) {
      closeModal()
      refetchDeveloper()
    }
  }

export const SubmitReviewModal: FC<SubmitReviewModalProps> = ({ closeModal, refetchDeveloper, developer }) => {
  const { globalDataState } = useGlobalState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Marketplace.UpdateDeveloperModel>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...developer,
      companyName: developer.company,
      status: 'pending',
      reapitReference: '',
    },
  })

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [members] = useReapitGet<Marketplace.MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDeveloperMembers],
    uriParams: {
      developerId: connectSession?.loginIdentity.developerId,
    },
    queryParams: {
      role: 'admin',
      status: 'active',
    },
    fetchWhenTrue: [connectSession?.loginIdentity.developerId],
  })

  const [updateDeveloperLoading, , updateDeveloper, updateDeveloperSuccess] = useReapitUpdate<
    Marketplace.UpdateDeveloperModel,
    Marketplace.UpdateDeveloperModel
  >({
    method: 'PUT',
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateDeveloper],
    uriParams: {
      developerId: connectSession?.loginIdentity.developerId,
    },
  })

  useEffect(handleCloseModal(closeModal, refetchDeveloper, updateDeveloperSuccess), [updateDeveloperSuccess])

  const { currentMember } = globalDataState
  const isCustomer = selectIsCustomer(connectSession)
  const userRole = currentMember?.role
  const orgStatus = developer.status

  if (!isCustomer) {
    return (
      <>
        <BodyText>Any changes have been saved successfully.</BodyText>
        <BodyText>
          However, before you can list an app in the AppMarket (&apos;Submit for approval&apos;), you will first need to
          submit your account information.
        </BodyText>
        <BodyText>
          Please{' '}
          <a
            href="mailto:jhennessy@reapit.com?subject=Submitting%20my%20app%20for%20approval%20/%20listing%20in%20the%20AppMarket"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            click here
          </a>{' '}
          to contact a member of the team.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </>
    )
  }

  if (orgStatus === 'pending') {
    return (
      <>
        <BodyText>
          We are currently verifying your account information. This is typically done within 1 – 2 working days. You
          will be notified via email when this has been completed and you can continue with your app submission.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </>
    )
  }

  if (userRole !== 'admin') {
    return (
      <>
        <BodyText>Any changes have been saved successfully.</BodyText>
        <BodyText>
          However, before an app can be submitted (either privately or publicly), we will first need to verify your
          account information (which can only be submitted by an Admin) as API Consumption charges will apply.
        </BodyText>
        <BodyText>Please contact one of the Admins listed below:</BodyText>
        <Table
          className={elMb6}
          rows={members?.data?.map((member) => ({
            cells: [
              {
                label: 'Name',
                value: member.name ?? '',
                icon: 'contact',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Email Admin',
                value: '',
                children: (
                  <a
                    href={`mailto:${member.email}?subject=Developer%20Portal%20–%20Listing%20our%20app&body=Before%20we%20can%20submit%20an%20app,%20we%20need%20to%20verify%20our%20Reapit%20Reference.%20Please%20can%20you%20login%20to%20the%20Developer%20Portal,%20submit%20the%20app%20and%20enter%20the%20required%20information.%20The%20Reapit%20Reference%20can%20be%20found%20on%20any%20Reapit%20correspondence%20under%20the%20‘Account’%20section.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Send Email
                  </a>
                ),
                icon: 'email',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
          }))}
        />
        <BodyText>
          Alternatively, you can request the option to become an Admin. Simply ask one of the Admins above to visit the
          ‘Organisation’ page to view the member options.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit((values) => updateDeveloper(values))}>
      <BodyText>Any changes have been saved successfully.</BodyText>
      <BodyText>
        However, before an app can be submitted (either privately or publicly), we will first need to verify your
        account information as API Consumption charges will apply.
      </BodyText>
      <InputGroup
        className={elMb6}
        {...register('reapitReference')}
        inputAddOnText={errors?.reapitReference?.message}
        type="text"
        label="Reapit Reference"
        placeholder="Enter your Reapit reference here"
        intent="danger"
      />
      <BodyText>
        You can find your Reapit Reference from any Reapit correspondence under the ‘Account’ section.
      </BodyText>
      <BodyText>
        The verification process is typically completed within 1 – 2 working days. You will be notified via email when
        this has been completed and you can continue with your app submission.
      </BodyText>
      <ButtonGroup alignment="right">
        <Button intent="default" onClick={closeModal}>
          Close
        </Button>
        <Button intent="primary" type="submit" disabled={updateDeveloperLoading} loading={updateDeveloperLoading}>
          Submit
        </Button>
      </ButtonGroup>
    </form>
  )
}
