import React, { Dispatch, FC, SetStateAction } from 'react'
import { AppsFilters } from '.'
import { useForm } from 'react-hook-form'
import { FormLayout, InputWrap, InputGroup, elMb11 } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface FilterFormProps {
  setUsageFilters: Dispatch<SetStateAction<AppsFilters>>
  apps: AppSummaryModelPagedResult | null
}

export const FilterForm: FC<FilterFormProps> = ({ setUsageFilters }) => {
  const { register, handleSubmit } = useForm<AppsFilters>({ mode: 'onChange' })

  return (
    <form onChange={handleSubmit(setUsageFilters)}>
      <FormLayout className={elMb11}>
        <InputWrap>
          <InputGroup {...register('searchTerm')} label="App or Developer Name" type="search" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('companyName')} label="Company Name" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('registeredFrom')} label="Registered From" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('registeredTo')} label="Registered To" type="date" />
        </InputWrap>
      </FormLayout>
    </form>
  )
}
