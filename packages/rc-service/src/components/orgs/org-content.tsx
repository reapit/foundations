import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import ErrorBoundary from '../error-boundary'
import {
  BodyText,
  Button,
  ButtonGroup,
  Col,
  FormLayout,
  Grid,
  InputGroup,
  InputWrapFull,
  Loader,
  PersistantNotification,
  Subtitle,
  elMb7,
} from '@reapit/elements'
import {
  GetActionNames,
  SendFunction,
  UpdateActionNames,
  getActions,
  updateActions,
  useReapitGet,
  useReapitUpdate,
} from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OrganisationModel, UpdatePlatformConfigurationModel } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { getIsAdmin } from '../../utils/is-admin'
import { DisplayChip } from '../users/__styles__'
import { UseFormReset, useForm } from 'react-hook-form'

export interface OrgContentProps {
  org: OrganisationModel
  refreshOrgs: () => void
}

export interface ShouldFetchState {
  orgConfig?: boolean
}

export const handleShouldFetch =
  (setShouldFetch: Dispatch<SetStateAction<ShouldFetchState>>, shouldFetchState: ShouldFetchState) => () => {
    setShouldFetch(shouldFetchState)
  }

export const handleUpdatePlatformConfig =
  (
    updatePlatformConfig: SendFunction<UpdatePlatformConfigurationModel, boolean>,
    refreshOrgs: () => void,
    setShouldFetch: Dispatch<SetStateAction<ShouldFetchState>>,
  ) =>
  async (values: UpdatePlatformConfigurationModel) => {
    const hasUpdated = await updatePlatformConfig(values)

    if (hasUpdated) {
      refreshOrgs()
      setShouldFetch({})
    }
  }

export const handleResetForm =
  (reset: UseFormReset<UpdatePlatformConfigurationModel>, platformConfig: UpdatePlatformConfigurationModel | null) =>
  () => {
    if (platformConfig) {
      reset(platformConfig)
    }
  }

export const OrgContent: FC<OrgContentProps> = ({ org, refreshOrgs }) => {
  const [shouldFetch, setShouldFetch] = useState<ShouldFetchState>({})
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { isSupport, isFoundationsAdmin } = getIsAdmin(connectSession)

  const [platformConfig, platformConfigLoading] = useReapitGet<UpdatePlatformConfigurationModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getOrgConfig],
    uriParams: { orgId: org.id },
    fetchWhenTrue: [org.id, shouldFetch.orgConfig],
  })

  const [userUpdateLoading, , updatePlatformConfig] = useReapitUpdate<UpdatePlatformConfigurationModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updatePlatformConfig],
    method: 'PUT',
    uriParams: {
      orgId: org.id,
    },
  })

  const { register, handleSubmit, reset } = useForm<UpdatePlatformConfigurationModel>({
    defaultValues: platformConfig ?? {},
  })

  useEffect(handleResetForm(reset, platformConfig), [platformConfig])

  const isLoading = userUpdateLoading || platformConfigLoading

  return (
    <ErrorBoundary>
      <Grid className={elMb7}>
        <Col>
          <Subtitle>Manage Platform Config</Subtitle>
          <ButtonGroup alignment="left">
            <Button
              intent="primary"
              disabled={!isSupport && !isFoundationsAdmin}
              onClick={handleShouldFetch(setShouldFetch, { orgConfig: true })}
            >
              Load Management Form
            </Button>
          </ButtonGroup>
        </Col>
      </Grid>
      {isLoading && <Loader />}
      {isSupport && shouldFetch.orgConfig && platformConfig ? (
        <>
          <Subtitle>Groups</Subtitle>
          <BodyText hasGreyText>
            {Object.keys(platformConfig).map((key: string) => (
              <DisplayChip key={key}>{`${key}: ${platformConfig[key]}`}</DisplayChip>
            ))}
          </BodyText>
          <form onSubmit={handleSubmit(handleUpdatePlatformConfig(updatePlatformConfig, refreshOrgs, setShouldFetch))}>
            <FormLayout hasMargin>
              <InputWrapFull>
                <InputGroup {...register('publicAssetsLocation')} label="Public Asset Location" />
              </InputWrapFull>
              <InputWrapFull>
                <InputGroup {...register('extrasWhitelist')} label="Extra Whitelist" />
              </InputWrapFull>
            </FormLayout>
            <ButtonGroup alignment="center">
              <Button intent="primary" type="submit" disabled={userUpdateLoading} loading={userUpdateLoading}>
                Save
              </Button>
            </ButtonGroup>
          </form>
        </>
      ) : shouldFetch.orgConfig ? (
        <PersistantNotification isFullWidth isExpanded isInline intent="secondary">
          No config for this organisation.
        </PersistantNotification>
      ) : null}
    </ErrorBoundary>
  )
}
