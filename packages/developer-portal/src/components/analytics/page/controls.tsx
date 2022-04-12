import React, { FC, SetStateAction, Dispatch } from 'react'
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
import { ControlsContainer, inputFullWidth, overflowHidden, visiblyHidden } from './__styles__'
import { cx } from '@linaria/core'
import { AppSummaryModel, InstallationModel, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { AnalyticsFilterState, useAnalyticsState } from '../state/use-analytics-state'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'
import Routes from '../../../constants/routes'
import dayjs from 'dayjs'

export const handleFormChange =
  (setAnalyticsFilterState: Dispatch<SetStateAction<AnalyticsFilterState>>) => (values: AnalyticsFilterState) => {
    setAnalyticsFilterState(values)
  }

export const Controls: FC = () => {
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setAnalyticsFilterState, analyticsFilterState, analyticsDataState } = useAnalyticsState()
  const { pathname } = location
  const { appId, dateTo, monthTo, dateFrom, monthFrom } = analyticsFilterState
  const { apps } = analyticsDataState
  const developerId = connectSession?.loginIdentity.developerId
  const appQuery = appId ? { appId } : {}
  const isCallsInstallsPage = pathname === Routes.ANALYTICS_API_CALLS || pathname === Routes.ANALYTICS_INSTALLATIONS
  const isCostsPage = pathname === Routes.ANALYTICS_COSTS
  const isCalcPage = pathname === Routes.ANALYTICS_COST_CALCULATOR

  const [installations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: { developerId, pageSize: 999, isInstalled: true, ...appQuery },
    fetchWhenTrue: [developerId],
  })

  const { register, handleSubmit } = useForm<AnalyticsFilterState>({
    mode: 'onChange',
    defaultValues: analyticsFilterState,
  })

  return (
    <div className={cx(isCalcPage && visiblyHidden, elFadeIn)}>
      <Icon className={cx(isCalcPage && visiblyHidden, elMb3)} icon="crmInfographic" iconSize="large" />
      <Subtitle className={cx(isCalcPage && visiblyHidden)}>Filter By</Subtitle>
      <SmallText hasGreyText>
        Please note, there is a max 6 month date range for filters. You can move your date from filter to earlier but
        you need to move your date to filter in line with this.
      </SmallText>
      <div className={cx(elBorderRadius, overflowHidden)}>
        <form onChange={handleSubmit(handleFormChange(setAnalyticsFilterState))}>
          <ControlsContainer className={cx((isCostsPage || isCalcPage) && visiblyHidden)}>
            <InputGroup
              className={inputFullWidth}
              {...register('dateFrom')}
              type="date"
              label="Date From"
              min={dayjs(dateTo).subtract(6, 'months').format('YYYY-MM')}
              max={dayjs(dateTo).format('YYYY-MM')}
            />
          </ControlsContainer>
          <ControlsContainer className={cx((isCostsPage || isCalcPage) && visiblyHidden)}>
            <InputGroup
              className={inputFullWidth}
              {...register('dateTo')}
              type="date"
              label="Date To"
              min={dayjs(dateFrom).format('YYYY-MM-DD')}
              max={dayjs().format('YYYY-MM-DD')}
            />
          </ControlsContainer>
          <ControlsContainer className={cx((isCallsInstallsPage || isCalcPage) && visiblyHidden)}>
            <InputGroup
              className={inputFullWidth}
              {...register('monthFrom')}
              type="month"
              label="Month From"
              min={dayjs(monthTo).subtract(6, 'months').format('YYYY-MM')}
              max={dayjs(monthTo).format('YYYY-MM')}
            />
          </ControlsContainer>
          <ControlsContainer className={cx((isCallsInstallsPage || isCalcPage) && visiblyHidden)}>
            <InputGroup
              className={inputFullWidth}
              {...register('monthTo')}
              type="month"
              label="Month To"
              min={dayjs(monthFrom).format('YYYY-MM')}
              max={dayjs().format('YYYY-MM')}
            />
          </ControlsContainer>
          <ControlsContainer className={cx(isCalcPage && visiblyHidden)}>
            <InputGroup>
              <Select className={elWFull} {...register('appId')}>
                <option key="default-option" value="">
                  None selected
                </option>
                {apps?.data?.map(({ name, id }: AppSummaryModel) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
              <Label>App</Label>
            </InputGroup>
          </ControlsContainer>
          <ControlsContainer className={cx(isCalcPage && visiblyHidden)}>
            <InputGroup>
              <Select className={elWFull} {...register('clientId')}>
                <option key="default-option" value="">
                  None selected
                </option>
                {installations?.data?.map(({ id, client, customerName }: InstallationModel) => (
                  <option key={id} value={client}>
                    {customerName} ({client})
                  </option>
                ))}
              </Select>
              <Label>Client</Label>
            </InputGroup>
          </ControlsContainer>
        </form>
      </div>
    </div>
  )
}
