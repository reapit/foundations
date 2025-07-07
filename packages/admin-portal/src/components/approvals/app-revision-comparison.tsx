import React, { FC, useEffect } from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { DiffMedia } from './diff-media'
import { DiffCheckbox } from './diff-checkbox'
import { DiffViewer } from './diff-viewer'
import { DiffRenderHTML } from './diff-render-html'
import {
  SendFunction,
  useReapitGet,
  useReapitUpdate,
  GetActionNames,
  getActions,
  UpdateActionNames,
  updateActions,
} from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  elMb5,
  elMt5,
  FormLayout,
  InputGroup,
  InputWrapFull,
  Loader,
  PersistentNotification,
  Subtitle,
  useModal,
} from '@reapit/elements'
import { LoginIdentity, useReapitConnect } from '@reapit/connect-session'
import dayjs from 'dayjs'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePermissionsState } from '../../core/use-permissions-state'

export type AppRevisionComparisonProps = {
  approval: Marketplace.ApprovalModel | null
  refreshApprovals: () => void
}

interface RejectRevisionForm {
  rejectionReason: string
}

export type DiffMediaModel = {
  currentMedia?: string
  changedMedia?: string
  order: number
  type: string
}

const diffStringList: { [k in keyof Marketplace.AppRevisionModel]: string } = {
  name: 'Name',
  homePage: 'Home page',
  launchUri: 'Launch URI',
  supportEmail: 'Support Email',
  telephone: 'Telephone',
  summary: 'Summary',
  description: 'Description',
  redirectUris: 'Redirect URIs',
  signoutUris: 'Signout URIs',
  limitToClientIds: 'Private Apps',
  desktopIntegrationTypeIds: 'Integration Type',
  products: 'Products',
  privacyPolicyUrl: 'Privacy Policy',
  termsAndConditionsUrl: 'Terms & Conditions',
  pricingUrl: 'Pricing Info',
}

export const isAppearInScope = (nameNeedToFind: string | undefined, scopes: Marketplace.ScopeModel[] = []): boolean => {
  if (!nameNeedToFind || !scopes?.length) {
    return false
  }
  const result = scopes.find((item: Marketplace.ScopeModel) => {
    return item.name === nameNeedToFind
  })
  return !!result
}

export const renderCheckboxesDiff = ({
  scopes,
  appScopes,
  revisionScopes,
}: {
  scopes: Marketplace.ScopeModel[]
  appScopes: Marketplace.ScopeModel[] | undefined
  revisionScopes: Marketplace.ScopeModel[] | undefined
}) => {
  return scopes.map((scope: Marketplace.ScopeModel) => {
    const isCheckedInAppDetail = isAppearInScope(scope.name, appScopes)
    const isCheckedInRevision = isAppearInScope(scope.name, revisionScopes)
    return (
      <div className={elMb5} key={scope.name}>
        <BodyText hasGreyText>{scope.description}</BodyText>
        <DiffCheckbox currentChecked={isCheckedInAppDetail} changedChecked={isCheckedInRevision} />
      </div>
    )
  })
}

export const getChangedMediaList = ({ app, revision }): DiffMediaModel[] => {
  const { media: revisionMedia } = revision
  const { media: appMedia } = app

  if (!revisionMedia || !appMedia) {
    return [
      {
        order: 0,
        type: 'media',
      },
    ]
  }

  // Check the longest array to compare
  const isNewMediaMoreItemThanOldOne = revisionMedia.length >= appMedia.length
  if (isNewMediaMoreItemThanOldOne) {
    return revisionMedia.map((revisionMedia: Marketplace.MediaModel, index: number) => ({
      changedMedia: revisionMedia?.uri,
      currentMedia: appMedia[index]?.uri,
      order: revisionMedia?.order || 0,
      type: revisionMedia?.type || '',
    }))
  }

  return appMedia.map((currentMedia: Marketplace.MediaModel, index: number) => ({
    changedMedia: revisionMedia[index]?.uri,
    currentMedia: currentMedia?.uri,
    order: currentMedia?.order || 0,
    type: currentMedia?.type || 'media',
  }))
}

export const mapIntegrationIdArrayToNameArray = (
  desktopIntegrationTypeIds?: string[],
  desktopIntegrationTypesArray?: Marketplace.DesktopIntegrationTypeModel[],
): string[] => {
  if (!desktopIntegrationTypeIds || !desktopIntegrationTypesArray) {
    return []
  }
  const result = desktopIntegrationTypeIds.map((id: string) => {
    const matchedIntegration = desktopIntegrationTypesArray.find(
      (integration: Marketplace.DesktopIntegrationTypeModel) => integration.id === id,
    )
    return matchedIntegration?.name ?? ''
  })
  return result.filter((r) => r)
}

export type RenderDiffContentParams = {
  key: string
  revision: Marketplace.AppRevisionModel
  app: Marketplace.AppDetailModel
  desktopIntegrationTypes: Marketplace.DesktopIntegrationTypeModelPagedResult
}

export const renderCategoriesDiff = (app: Marketplace.AppDetailModel, revision: Marketplace.AppRevisionModel) => {
  const currentString = app.categories?.map((category) => category.name).join(', ') ?? ''
  const changedString = revision.categories?.map((category) => category.name).join(', ') ?? ''

  return (
    <div className={elMb5}>
      <BodyText hasGreyText>Categories</BodyText>
      <DiffViewer currentString={currentString} changedString={changedString} type="words" />
    </div>
  )
}

export const renderDiffContent = ({ key, revision, app, desktopIntegrationTypes }: RenderDiffContentParams) => {
  if (key === 'description') {
    return <DiffRenderHTML currentString={app.description || ''} changedString={revision.description || ''} />
  }
  if (key === 'desktopIntegrationTypeIds') {
    const oldIntegrationTypeArray = mapIntegrationIdArrayToNameArray(
      app.desktopIntegrationTypeIds,
      desktopIntegrationTypes.data,
    )
    const newIntegrationTypeArray = mapIntegrationIdArrayToNameArray(
      revision.desktopIntegrationTypeIds,
      desktopIntegrationTypes.data,
    )
    const sortedOldArray = [...oldIntegrationTypeArray].sort((a, b) => a.localeCompare(b))
    const sortedNewArray = [...newIntegrationTypeArray].sort((a, b) => a.localeCompare(b))
    return (
      <DiffViewer
        currentString={sortedOldArray.join(', ')}
        changedString={sortedNewArray.join(', ')}
        type="wordsWithSpace"
      />
    )
  }
  if (['redirectUris', 'signoutUris', 'limitToClientIds', 'desktopIntegrationTypeIds', 'products'].includes(key)) {
    const currentString = Array.isArray(app[key]) ? app[key].join(' ') : ''
    const changedString = Array.isArray(revision[key]) ? revision[key].join(' ') : ''
    return <DiffViewer currentString={currentString} changedString={changedString} type="words" />
  }
  return <DiffViewer currentString={app[key] || ''} changedString={revision[key] || ''} type="words" />
}

export const validationSchema = object().shape({
  rejectionReason: string().trim().required('Required'),
})

export const handleApproveRevision =
  (
    approveRevision: SendFunction<Marketplace.ApproveModel, boolean>,
    closeModal: () => void,
    loginIdentity?: LoginIdentity,
  ) =>
  () => {
    const email = loginIdentity?.email
    const name = loginIdentity?.name

    if (email && name) {
      approveRevision({
        email,
        name,
        publicListedDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      })
      closeModal()
    }
  }

export const handleRejectRevision =
  (
    rejectRevision: SendFunction<Marketplace.RejectRevisionModel, boolean>,
    closeModal: () => void,
    loginIdentity?: LoginIdentity,
  ) =>
  (values: RejectRevisionForm) => {
    const email = loginIdentity?.email
    const name = loginIdentity?.name

    if (email && name) {
      rejectRevision({ email, name, rejectionReason: values.rejectionReason })
      closeModal()
    }
  }

export const handleRefreshApprovals = (refreshApprovals: () => void, shouldRefresh: boolean) => () => {
  if (shouldRefresh) {
    refreshApprovals()
  }
}

export const handleSendConstents =
  (createConsentEmails: SendFunction<Marketplace.CreateAppRevisionConsentsModel, boolean>, email?: string) => () => {
    if (email) {
      createConsentEmails({ actionedBy: email })
    }
  }

export const AppRevisionComparison: FC<AppRevisionComparisonProps> = ({ approval, refreshApprovals }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { hasReadAccess } = usePermissionsState()
  const { Modal: ApproveModal, openModal: openApproveModal, closeModal: closeApproveModal } = useModal()
  const { Modal: DeclineModal, openModal: openDeclineModal, closeModal: closeDeclineModal } = useModal()
  const appId = approval?.appId
  const revisionId = approval?.appRevisionId
  const email = connectSession?.loginIdentity.email

  const [app, appLoading] = useReapitGet<Marketplace.AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getAppById],
    uriParams: {
      appId,
    },
    fetchWhenTrue: [appId],
  })

  const [revision, revisionLoading] = useReapitGet<Marketplace.AppRevisionModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getRevisionById],
    uriParams: {
      revisionId,
      appId,
    },
    fetchWhenTrue: [revisionId, appId],
  })

  const [desktopIntegrationTypes, desktopTypesLoading] =
    useReapitGet<Marketplace.DesktopIntegrationTypeModelPagedResult>({
      reapitConnectBrowserSession,
      action: getActions[GetActionNames.getDesktopIntegrationTypes],
    })

  const [scopes, scopesLoading] = useReapitGet<Marketplace.ScopeModel[]>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getAppPermissions],
  })

  const [, , approveRevision, revisionApproved] = useReapitUpdate<Marketplace.ApproveModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.approveRevision],
    method: 'POST',
    uriParams: {
      appId,
      revisionId,
    },
  })

  const [, , rejectRevision, revisionRejected] = useReapitUpdate<Marketplace.RejectRevisionModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.rejectRevision],
    method: 'POST',
    uriParams: {
      appId,
      revisionId,
    },
  })

  const [, , createConsentEmails] = useReapitUpdate<Marketplace.CreateAppRevisionConsentsModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.createConsentEmails],
    method: 'POST',
    uriParams: {
      appId,
      revisionId,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RejectRevisionForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      rejectionReason: '',
    },
  })

  useEffect(handleRefreshApprovals(refreshApprovals, Boolean(revisionApproved || revisionRejected)), [
    revisionApproved,
    revisionRejected,
  ])

  if (appLoading || revisionLoading || desktopTypesLoading || scopesLoading) {
    return <Loader />
  }

  if (!approval || !app || !revision || !desktopIntegrationTypes || !scopes) {
    return (
      <PersistentNotification className={elMb11} intent="primary" isExpanded isFullWidth isInline>
        Data not returned to complete this request
      </PersistentNotification>
    )
  }

  return (
    <div className={elMt5}>
      <Subtitle>{app.name} Revision Diff</Subtitle>
      {Object.keys(diffStringList).map((key) => {
        return (
          <div className={elMb5} key={key}>
            <BodyText hasGreyText>{diffStringList[key]}</BodyText>
            {renderDiffContent({ key, app, desktopIntegrationTypes, revision })}
          </div>
        )
      })}
      {renderCategoriesDiff(app, revision)}
      {renderCheckboxesDiff({ scopes, appScopes: app.scopes, revisionScopes: revision.scopes })}
      <div className={elMb5}>
        <BodyText hasGreyText>Is listed</BodyText>
        <DiffCheckbox
          currentChecked={Boolean(app.isListed)}
          changedChecked={Boolean(revision.isListed)}
          dataTest="revision-diff-isListed"
        />
      </div>
      <div className={elMb5}>
        <BodyText hasGreyText>Is Free</BodyText>
        <DiffCheckbox
          currentChecked={Boolean(app.isFree)}
          changedChecked={Boolean(revision.isFree)}
          dataTest="revision-diff-isFree"
        />
      </div>
      <div className={elMb5}>
        <BodyText hasGreyText>Is Integration</BodyText>
        <DiffCheckbox
          currentChecked={Boolean(app.isDirectApi)}
          changedChecked={Boolean(revision.isDirectApi)}
          dataTest="revision-diff-isDirectApi"
        />
      </div>
      <div className={elMb5}>
        <BodyText hasGreyText>Is Delete Protected</BodyText>
        <DiffCheckbox
          currentChecked={Boolean(app.deletionProtection)}
          changedChecked={Boolean(revision.deletionProtection)}
          dataTest="revision-diff-deletion-protection"
        />
      </div>
      {getChangedMediaList({ app, revision }).map((media) => (
        <div className={elMb5} key={media.order}>
          <BodyText hasGreyText>
            {media.type} {media.order > 0 && <span>{media.order}</span>}
          </BodyText>
          {media.type === 'video' ? (
            <DiffViewer
              currentString={media.currentMedia ?? ''}
              changedString={media.changedMedia ?? ''}
              type="words"
            />
          ) : (
            <DiffMedia changedMedia={media.changedMedia} currentMedia={media.currentMedia} type={media.type} />
          )}
        </div>
      ))}
      <ButtonGroup alignment="center">
        <Button onClick={openDeclineModal} disabled={hasReadAccess} intent="danger">
          Decline Revision
        </Button>
        <Button onClick={openApproveModal} disabled={hasReadAccess} intent="primary">
          Approve Revision
        </Button>
        <Button intent="primary" onClick={handleSendConstents(createConsentEmails, email)} disabled={hasReadAccess}>
          Send Consent Emails
        </Button>
      </ButtonGroup>
      <ApproveModal title={`Approve ${app.name} Revision`}>
        <BodyText>Are your sure you want to approve the revision for &lsquo;{app.name}&rsquo;?</BodyText>
        <ButtonGroup alignment="center">
          <Button onClick={closeApproveModal}>Cancel</Button>
          <Button
            intent="primary"
            onClick={handleApproveRevision(approveRevision, closeApproveModal, connectSession?.loginIdentity)}
          >
            Approve
          </Button>
        </ButtonGroup>
      </ApproveModal>
      <DeclineModal title={`Decline ${app.name} Revision`}>
        <BodyText>Are your sure you want to decline the revision for &lsquo;{app.name}&rsquo;?</BodyText>
        <form
          onSubmit={handleSubmit(
            handleRejectRevision(rejectRevision, closeDeclineModal, connectSession?.loginIdentity),
          )}
        >
          <FormLayout className={elMb11}>
            <InputWrapFull>
              <InputGroup
                {...register('rejectionReason')}
                label="Rejection Reason"
                errorMessage={errors?.rejectionReason?.message}
                icon={errors?.rejectionReason?.message ? 'asterisk' : null}
                intent="danger"
              />
            </InputWrapFull>
          </FormLayout>
          <ButtonGroup alignment="center">
            <Button onClick={closeDeclineModal}>Cancel</Button>
            <Button intent="danger" type="submit">
              Decline
            </Button>
          </ButtonGroup>
        </form>
      </DeclineModal>
    </div>
  )
}

export default AppRevisionComparison
