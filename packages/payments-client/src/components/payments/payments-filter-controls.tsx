import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { statusOptions } from '../../constants/filter-options'
import { useForm, UseFormWatch } from 'react-hook-form'
import { ControlsContainer, inputFullWidth, overflowHidden } from './__styles__'
import { cx } from '@linaria/core'
import { elBorderRadius, elMb5, elWFull, InputGroup, Label, Select } from '@reapit/elements'
import { DATE_TIME_FORMAT } from '@reapit/utils-common'
import dayjs from 'dayjs'
import { PaymentsFilters } from '.'
import debounce from 'just-debounce-it'

export interface PaymentsFilterProps {
  paymentsFilters: PaymentsFilters
  setPaymentsFilters: Dispatch<SetStateAction<PaymentsFilters>>
}

export const handleFormChange =
  (setPaymentsFilters: Dispatch<SetStateAction<PaymentsFilters>>, watch: UseFormWatch<PaymentsFilters>) => () => {
    const subscription = watch(debounce(setPaymentsFilters, 500))
    return () => subscription.unsubscribe()
  }

export const PaymentsFilterControls: FC<PaymentsFilterProps> = ({ paymentsFilters, setPaymentsFilters }) => {
  const { register, watch } = useForm<PaymentsFilters>({
    mode: 'onChange',
    defaultValues: {
      ...paymentsFilters,
    },
  })
  const { createdTo, createdFrom } = paymentsFilters

  useEffect(handleFormChange(setPaymentsFilters, watch), [])

  return (
    <div className={cx(elBorderRadius, overflowHidden, elMb5)}>
      <form>
        <ControlsContainer>
          <InputGroup
            className={inputFullWidth}
            {...register('createdFrom')}
            type="date"
            label="Created From"
            min={dayjs().subtract(2, 'years').format(DATE_TIME_FORMAT.YYYY_MM_DD)}
            max={dayjs(createdTo).format(DATE_TIME_FORMAT.YYYY_MM_DD)}
          />
        </ControlsContainer>
        <ControlsContainer>
          <InputGroup
            className={inputFullWidth}
            {...register('createdTo')}
            type="date"
            label="Created To"
            min={dayjs(createdFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD)}
            max={dayjs().add(1, 'day').format(DATE_TIME_FORMAT.YYYY_MM_DD)}
          />
        </ControlsContainer>
        <ControlsContainer>
          <InputGroup>
            <Select className={elWFull} {...register('status')}>
              <option key="default-option" value="">
                None selected
              </option>
              {statusOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <Label>Status</Label>
          </InputGroup>
        </ControlsContainer>
        <ControlsContainer>
          <InputGroup className={inputFullWidth} {...register('description')} type="text" label="Description" />
        </ControlsContainer>
      </form>
    </div>
  )
}
