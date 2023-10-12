import React, { Dispatch, FC, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { FormLayout, InputWrap, InputGroup, Label, Select } from '@reapit/elements'
import { SubscriptionsFilters } from '.'
import debounce from 'just-debounce-it'

export interface FilterFormProps {
  setSubscriptionsFilters: Dispatch<SetStateAction<SubscriptionsFilters>>
}

export const FilterForm: FC<FilterFormProps> = ({ setSubscriptionsFilters }) => {
  const { register, handleSubmit } = useForm<SubscriptionsFilters>({ mode: 'all' })

  return (
    <form onChange={handleSubmit(debounce(setSubscriptionsFilters, 500))}>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup {...register('organisationName')} label="Company Name" />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('userEmail')} type="email" label="User Email" />
        </InputWrap>
        <InputWrap>
          <InputGroup>
            <Label>Subscription Type</Label>
            <Select {...register('subscriptionType')}>
              <option value="">Please Select</option>
              <option value="applicationListing">Application Listing</option>
              <option value="developerRegistration">Developer Registration</option>
              <option value="developerEdition">Developer Edition</option>
            </Select>
          </InputGroup>
        </InputWrap>
        <InputWrap>
          <InputGroup>
            <Label>Status</Label>
            <Select {...register('status')}>
              <option value="">Please Select</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </InputGroup>
        </InputWrap>
      </FormLayout>
    </form>
  )
}
