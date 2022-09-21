import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { AppsFilters } from '.'
import { useForm, UseFormWatch } from 'react-hook-form'
import { FormLayout, InputWrap, InputGroup, elMb11, ToggleRadio, Label } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface FilterFormProps {
  setAppsFilters: Dispatch<SetStateAction<AppsFilters>>
  apps: AppSummaryModelPagedResult | null
}

export const handleSetAppsFilters =
  (setAppsFilters: Dispatch<SetStateAction<AppsFilters>>, watch: UseFormWatch<AppsFilters>) => () => {
    const subscription = watch((values: AppsFilters) => setAppsFilters(values))
    return () => subscription.unsubscribe()
  }

export const FilterForm: FC<FilterFormProps> = ({ setAppsFilters }) => {
  const { register, watch } = useForm<AppsFilters>()

  useEffect(handleSetAppsFilters(setAppsFilters, watch), [])

  return (
    <form>
      <FormLayout className={elMb11}>
        <InputWrap>
          <InputGroup {...register('searchTerm')} label="App or Developer Name" type="search" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('companyName')} label="Company Name" type="search" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('id')} label="App Id" type="search" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('registeredFrom')} label="Registered From" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('registeredTo')} label="Registered To" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('publicListedDateFrom')} label="Publicly Listed From" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('publicListedDateTo')} label="Publicly Listed To" type="date" />
        </InputWrap>
        <InputWrap>
          <Label>In Public AppMarket</Label>
          <ToggleRadio
            {...register('isPublic')}
            hasGreyBg
            options={[
              {
                id: 'option-public-all',
                value: '',
                text: 'All',
                isChecked: true,
              },
              {
                id: 'option-public-true',
                value: 'true',
                text: 'Public',
                isChecked: false,
              },
              {
                id: 'option-public-false',
                value: 'false',
                text: 'Private',
                isChecked: false,
              },
            ]}
          />
        </InputWrap>
        <InputWrap>
          <Label>Integration or AC Enabled</Label>
          <ToggleRadio
            {...register('isDirectApi')}
            hasGreyBg
            options={[
              {
                id: 'option-integration-all',
                value: '',
                text: 'All',
                isChecked: true,
              },
              {
                id: 'option-integration-true',
                value: 'true',
                text: 'Integration',
                isChecked: false,
              },
              {
                id: 'option-integration-false',
                value: 'false',
                text: 'AC App',
                isChecked: false,
              },
            ]}
          />
        </InputWrap>
        <InputWrap>
          <Label>Publicly Listed</Label>
          <ToggleRadio
            {...register('isListed')}
            hasGreyBg
            options={[
              {
                id: 'option-listed-all',
                value: '',
                text: 'All',
                isChecked: true,
              },
              {
                id: 'option-listed-true',
                value: 'true',
                text: 'Listed',
                isChecked: false,
              },
              {
                id: 'option-listed-false',
                value: 'false',
                text: 'Development',
                isChecked: false,
              },
            ]}
          />
        </InputWrap>
      </FormLayout>
    </form>
  )
}
