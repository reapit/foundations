import React, { FC } from 'react'
import {
  elBorderRadius,
  elFadeIn,
  elMb3,
  elWFull,
  Icon,
  InputGroup,
  Label,
  Select,
  SmallText,
  Subtitle,
} from '@reapit/elements'
import { ControlsContainer, inputFullWidth, overflowHidden } from './__styles__'
import { cx } from '@linaria/core'
import { AppSummaryModel, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

export const Controls: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 25 },
    fetchWhenTrue: [developerId],
  })

  return (
    <div className={elFadeIn}>
      <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
      <Subtitle>Filters</Subtitle>
      <SmallText hasGreyText>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</SmallText>
      <div className={cx(elBorderRadius, overflowHidden)}>
        <ControlsContainer>
          <InputGroup className={inputFullWidth} type="date" name="from" label="Date From" />
        </ControlsContainer>
        <ControlsContainer>
          <InputGroup className={inputFullWidth} type="date" name="to" label="Date To" />
        </ControlsContainer>
        <ControlsContainer>
          <InputGroup>
            <Select className={elWFull} name="applicationId">
              <option key="default-option" value="">
                None selected
              </option>
              {apps?.data?.map((app: AppSummaryModel) => (
                <option key={app.id} value={app.id}>
                  {app.name}
                </option>
              ))}
            </Select>
            <Label>App Name</Label>
          </InputGroup>
        </ControlsContainer>
      </div>
    </div>
  )
}
