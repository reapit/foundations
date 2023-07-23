import React, { FC, useCallback, useMemo, useState } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  FormLayout,
  InputError,
  InputGroup,
  InputWrap,
  Label,
  Select,
  Title,
} from '@reapit/elements'
import developerEditionPricing from '../../../assets/files/foundation-pricing-2021.pdf'
import { EndpointsUsedRange, endpointsUsedRange } from './use-foundation-cost-table'
import { useForm } from 'react-hook-form'
import { AnalyticsCalculatorTable } from './results-table'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './validation-schema'

export type CostCalculatorFormValues = {
  endpointsUsed: string
  apiCalls: string
}

export const prepareInitialValues = (endpointsUsed: string, apiCalls: string) => () =>
  ({
    endpointsUsed,
    apiCalls,
  } as CostCalculatorFormValues)

export const handleOnSubmit =
  (setEndpointsUsed: (endpointsUsed: string) => void, setApiCalls: (apiCalls: string) => void) =>
  (values: CostCalculatorFormValues) => {
    const { endpointsUsed, apiCalls } = values
    setEndpointsUsed(endpointsUsed)
    setApiCalls(apiCalls)
  }

export const handleOnClear =
  (setEndpointsUsed: (endpointsUsed: string) => void, setApiCalls: (apiCalls: string) => void) =>
  (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setEndpointsUsed('')
    setApiCalls('')
  }

export const renderEndpointsUsedOptions = (endpointsUsedRange: EndpointsUsedRange) => {
  const endpointsUsed = Object.keys(endpointsUsedRange).map((key) => ({ value: key, label: endpointsUsedRange[key] }))
  return [
    {
      label: 'Please select',
      value: '',
    },
    ...endpointsUsed.map((item) => {
      return {
        value: item.value,
        label: item.label,
      }
    }),
  ]
}

export const AnalyticsCalculator: FC = () => {
  const [endpointsUsed, setEndpointsUsed] = useState('')
  const [apiCalls, setApiCalls] = useState('')
  const formValues = useMemo(prepareInitialValues(endpointsUsed, apiCalls), [endpointsUsed, apiCalls])
  const onSubmit = useCallback(handleOnSubmit(setEndpointsUsed, setApiCalls), [])
  const onClear = useCallback(handleOnClear(setEndpointsUsed, setApiCalls), [])
  const options = renderEndpointsUsedOptions(endpointsUsedRange)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CostCalculatorFormValues>({
    mode: 'onChange',
    defaultValues: formValues,
    resolver: yupResolver(validationSchema),
  })

  return (
    <>
      <Title>Calculator</Title>
      <BodyText hasGreyText>
        You can calculate the estimated monthly cost below using our Cost Calculator. Just select the number of
        endpoints and enter the amount of API calls below. To see the full Foundations Pricing, please click{' '}
        <a href={developerEditionPricing} target="_blank" rel="noopener noreferrer">
          here
        </a>
      </BodyText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout hasMargin>
          <InputWrap>
            <InputGroup>
              <Label>Endpoints Used</Label>
              <Select {...register('endpointsUsed')}>
                {options.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
              {errors.endpointsUsed?.message && <InputError message={errors.endpointsUsed.message} />}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup {...register('apiCalls')} label="API Calls Used" type="text" />
            {errors.apiCalls?.message && <InputError message={errors.apiCalls.message} />}
          </InputWrap>
        </FormLayout>
        <ButtonGroup className={elMb11}>
          <Button intent="neutral" type="button" onClick={onClear as () => void}>
            Clear
          </Button>
          <Button intent="primary" type="submit">
            Calculate
          </Button>
        </ButtonGroup>
      </form>
      {endpointsUsed && apiCalls && <AnalyticsCalculatorTable apiCalls={apiCalls} endpointsUsed={endpointsUsed} />}
    </>
  )
}

export default AnalyticsCalculator
