import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { InstallationsFilters } from './settings-installed'
import { useForm, UseFormWatch } from 'react-hook-form'
import { FormLayout, InputWrap, InputGroup, elMb11 } from '@reapit/elements'
import debounce from 'just-debounce-it'

export interface FilterFormProps {
  setInstallationsFilters: Dispatch<SetStateAction<InstallationsFilters>>
}

export const handleSetInstallationsFilters =
  (
    setInstallationsFilters: Dispatch<SetStateAction<InstallationsFilters>>,
    watch: UseFormWatch<InstallationsFilters>,
  ) =>
  () => {
    const subscription = watch(debounce(setInstallationsFilters, 500))
    return () => subscription.unsubscribe()
  }

export const FilterForm: FC<FilterFormProps> = ({ setInstallationsFilters }) => {
  const { register, watch } = useForm<InstallationsFilters>()

  useEffect(handleSetInstallationsFilters(setInstallationsFilters, watch), [])

  return (
    <form>
      <FormLayout className={elMb11}>
        <InputWrap>
          <InputGroup {...register('appName')} label="Filter by App Name" type="search" />
        </InputWrap>
      </FormLayout>
    </form>
  )
}
