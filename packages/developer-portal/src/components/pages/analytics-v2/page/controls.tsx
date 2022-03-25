import React, { FC, ChangeEvent, SetStateAction, Dispatch } from 'react'
import {
  elBorderRadius,
  elFadeIn,
  elMb3,
  elMb6,
  elWFull,
  FlexContainer,
  Icon,
  InputGroup,
  Label,
  MultiSelectChip,
  Select,
  SmallText,
  Subtitle,
} from '@reapit/elements'
import { ControlsContainer, inputFullWidth, overflowHidden } from './__styles__'
import { cx } from '@linaria/core'
import {
  AppSummaryModel,
  AppSummaryModelPagedResult,
  InstallationModel,
  InstallationModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { AnalyticsFilterState, AnalyticsDateRange, useAnalyticsState } from '../state/use-analytics-state'
import { useForm } from 'react-hook-form'

export const handleOnChipChange =
  (setAnalyticsFilterState: Dispatch<SetStateAction<AnalyticsFilterState>>) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    setAnalyticsFilterState((currentState) => {
      const checkBoxVal = event.target.value as AnalyticsDateRange
      if (currentState.dateRange !== checkBoxVal) {
        return {
          ...currentState,
          dateRange: checkBoxVal,
        }
      }

      return {
        ...currentState,
        dateRange: null,
      }
    })
  }

export const handleFormChange =
  (setAnalyticsFilterState: Dispatch<SetStateAction<AnalyticsFilterState>>) => (values: AnalyticsFilterState) => {
    setAnalyticsFilterState(({ dateRange }) => ({
      ...values,
      dateRange,
    }))
  }

export const Controls: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setAnalyticsFilterState, analyticsFilterState } = useAnalyticsState()
  const { dateRange, appId } = analyticsFilterState
  const developerId = connectSession?.loginIdentity.developerId
  const appQuery = appId ? { appId } : {}

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 25 },
    fetchWhenTrue: [developerId],
  })

  const [installations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: { developerId, pageSize: 999, isInstalled: true, ...appQuery },
    fetchWhenTrue: [developerId],
  })

  const { register, handleSubmit } = useForm<AnalyticsFilterState>({
    mode: 'onChange',
    defaultValues: {
      ...analyticsFilterState,
      dateRange,
    },
  })

  return (
    <div className={elFadeIn}>
      <Icon className={elMb3} icon="crmInfographic" iconSize="large" />
      <Subtitle>Filters</Subtitle>
      <SmallText hasGreyText>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</SmallText>
      <div className={cx(elBorderRadius, overflowHidden)}>
        <FlexContainer className={elMb6} isFlexWrap>
          <MultiSelectChip
            value="today"
            checked={dateRange === 'today'}
            onChange={handleOnChipChange(setAnalyticsFilterState)}
          >
            Today
          </MultiSelectChip>
          <MultiSelectChip
            value="week"
            checked={dateRange === 'week'}
            onChange={handleOnChipChange(setAnalyticsFilterState)}
          >
            Week
          </MultiSelectChip>
          <MultiSelectChip
            value="month"
            checked={dateRange === 'month'}
            onChange={handleOnChipChange(setAnalyticsFilterState)}
          >
            Month
          </MultiSelectChip>
        </FlexContainer>
        <form onChange={handleSubmit(handleFormChange(setAnalyticsFilterState))}>
          <ControlsContainer>
            <InputGroup className={inputFullWidth} {...register('dateFrom')} type="date" label="Date From" />
          </ControlsContainer>
          <ControlsContainer>
            <InputGroup className={inputFullWidth} {...register('dateTo')} type="date" label="Date To" />
          </ControlsContainer>
          <ControlsContainer>
            <InputGroup className={inputFullWidth} {...register('month')} type="month" label="Month" />
          </ControlsContainer>
          <ControlsContainer>
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
          <ControlsContainer>
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
