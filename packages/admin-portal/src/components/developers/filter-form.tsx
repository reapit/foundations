import React, { Dispatch, FC, SetStateAction } from 'react'
import { FormLayout, InputWrap, InputGroup, elMb11, Label, Select } from '@reapit/elements'
import { useForm } from 'react-hook-form'
import debounce from 'just-debounce-it'

export interface DeveloperFilters {
  name?: string
  company?: string
  registeredFrom?: string
  registeredTo?: string
  status?: string
  gitHubUsername?: string
}

export interface FilterFormProps {
  setDeveloperFilters: Dispatch<SetStateAction<DeveloperFilters>>
}

export const FilterForm: FC<FilterFormProps> = ({ setDeveloperFilters }) => {
  const { register, handleSubmit } = useForm<DeveloperFilters>({ mode: 'onChange' })
  return (
    <form onChange={handleSubmit(debounce(setDeveloperFilters, 500))}>
      <FormLayout className={elMb11}>
        <InputWrap>
          <InputGroup {...register('name')} label="Developer Name" type="search" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('company')} label="Company Name" type="search" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('registeredFrom')} label="Registered From" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('registeredTo')} label="Registered To" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup>
            <Label>Status</Label>
            <Select {...register('status')}>
              <option value="">Please Select</option>
              <option value="incomplete">Incomplete</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="underReview">Under Review</option>
              <option value="removed">Removed</option>
            </Select>
          </InputGroup>
        </InputWrap>
      </FormLayout>
    </form>
  )
}
