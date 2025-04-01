import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { AppsFilters } from '.'
import { useForm, UseFormWatch } from 'react-hook-form'
import {
  FormLayout,
  InputWrap,
  InputGroup,
  elMb11,
  ToggleRadio,
  Label,
  InputWrapFull,
  MultiSelectInput,
  MultiSelectOption,
} from '@reapit/elements'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import debounce from 'just-debounce-it'
import { useReapitGet, GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export interface FilterFormProps {
  setAppsFilters: Dispatch<SetStateAction<AppsFilters>>
  apps: Marketplace.AppSummaryModelPagedResult | null
}

export const handleSetAppsFilters =
  (setAppsFilters: Dispatch<SetStateAction<AppsFilters>>, watch: UseFormWatch<AppsFilters>) => () => {
    const subscription = watch(debounce(setAppsFilters, 500))
    return () => subscription.unsubscribe()
  }

export const FilterForm: FC<FilterFormProps> = ({ setAppsFilters }) => {
  const { register, watch } = useForm<AppsFilters>()

  useEffect(handleSetAppsFilters(setAppsFilters, watch), [])

  const [appsBrowseCategoriesCollection] = useReapitGet<Marketplace.CategoryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getAppCategories],
    queryParams: { pageSize: 50 },
  })

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
          <InputGroup {...register('id')} label="Internal App Id" type="search" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('externalAppId')} label="External App Id" type="search" />
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
          <InputGroup>
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
          </InputGroup>
        </InputWrap>
        <InputWrap>
          <InputGroup>
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
          </InputGroup>
        </InputWrap>
        <InputWrap>
          <InputGroup>
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
          </InputGroup>
        </InputWrap>
        <InputWrap>
          <InputGroup>
            <Label>Is Charged Consumption</Label>
            <ToggleRadio
              {...register('isChargedConsumption')}
              hasGreyBg
              options={[
                {
                  id: 'option-consumption-all',
                  value: '',
                  text: 'All',
                  isChecked: true,
                },
                {
                  id: 'option-consumption-true',
                  value: 'true',
                  text: 'Charged',
                  isChecked: false,
                },
                {
                  id: 'option-consumption-false',
                  value: 'false',
                  text: 'Free',
                  isChecked: false,
                },
              ]}
            />
          </InputGroup>
        </InputWrap>
        {appsBrowseCategoriesCollection && (
          <>
            <InputWrapFull>
              <InputGroup>
                <Label>Categories</Label>
                <MultiSelectInput
                  id="category"
                  {...register('category')}
                  options={
                    appsBrowseCategoriesCollection.data?.map(({ name, id }) => ({
                      name,
                      value: id,
                    })) as MultiSelectOption[]
                  }
                  defaultValues={[]}
                />
              </InputGroup>
            </InputWrapFull>
          </>
        )}
      </FormLayout>
    </form>
  )
}
