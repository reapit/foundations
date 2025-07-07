import React, { FC, SetStateAction, Dispatch, useMemo } from 'react'
import {
  BodyText,
  elBorderRadius,
  elFadeIn,
  elMb3,
  elMb7,
  elWFull,
  Icon,
  InputGroup,
  Label,
  Select,
  SmallText,
} from '@reapit/elements'
import { ControlsContainer, inputFullWidth, overflowHidden, visiblyHidden } from './__styles__'
import { cx } from '@linaria/core'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/use-reapit-data'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { AnalyticsFilterState, useAnalyticsState } from '../state/use-analytics-state'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'
import Routes from '../../../constants/routes'
import dayjs from 'dayjs'
import { MultiSelectOption } from '@reapit/elements'

export const handleFormChange =
  (setAnalyticsFilterState: Dispatch<SetStateAction<AnalyticsFilterState>>) => (values: AnalyticsFilterState) => {
    setAnalyticsFilterState(values)
  }

export const handleInstallationsToOptions = (installations?: Marketplace.InstallationModel[]) => () => {
  if (!installations) return []

  const customers = installations.map(({ customerName, client, officeGroupName }) => {
    const offGroupName = officeGroupName ? ` - ${officeGroupName} ` : ''
    return JSON.stringify({
      name: `${customerName} ${offGroupName} (${client})`,
      value: client ?? '',
    })
  })

  const options: MultiSelectOption[] = [...new Set(customers)].map((customer) => JSON.parse(customer))

  // Sort options alphabetically by name before rendering
  options.sort((a, b) => a.name.localeCompare(b.name))

  return options
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

  const [installations] = useReapitGet<Marketplace.InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
    queryParams: { developerId, pageSize: 999, isInstalled: true, ...appQuery },
    fetchWhenTrue: [developerId],
  })

  const { register, handleSubmit } = useForm<AnalyticsFilterState>({
    mode: 'onChange',
    defaultValues: analyticsFilterState,
  })

  const options = useMemo(handleInstallationsToOptions(installations?.data), [installations])

  return (
    <div className={cx(isCalcPage && visiblyHidden, elFadeIn, elMb7)}>
      <Icon className={cx(isCalcPage && visiblyHidden, elMb3)} icon="crmInfographic" iconSize="large" />
      <BodyText className={cx(isCalcPage && visiblyHidden)}>Filter By</BodyText>
      <SmallText tag="div" hasGreyText>
        Please use the filters below to search. Please note, we only hold transactional records for the last 12 months.
      </SmallText>
      <div className={cx(elBorderRadius, overflowHidden)}>
        <form onChange={handleSubmit(handleFormChange(setAnalyticsFilterState))}>
          <ControlsContainer className={cx((isCostsPage || isCalcPage) && visiblyHidden)}>
            <InputGroup
              className={inputFullWidth}
              {...register('dateFrom')}
              type="date"
              label="Date From"
              min={dayjs(dateTo).subtract(12, 'months').format('YYYY-MM-DD')}
              max={dayjs(dateTo).format('YYYY-MM-DD')}
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
              min={dayjs(monthTo).subtract(12, 'months').format('YYYY-MM')}
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
                {apps?.data
                  ?.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
                  .map(({ name, id }: Marketplace.AppSummaryModel) => (
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
                {options.map(({ name, value }) => (
                  <option key={name} value={value}>
                    {name}
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
