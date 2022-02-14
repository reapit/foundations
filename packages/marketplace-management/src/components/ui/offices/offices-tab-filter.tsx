import React, { FC } from 'react'
import {
  Button,
  ButtonGroup,
  elFadeIn,
  FlexContainer,
  FormLayout,
  InputGroup,
  InputWrap,
  elHFull,
} from '@reapit/elements'
import { useForm } from 'react-hook-form'

export interface OfficesFormSchema {
  name: string
}

export interface OfficesFormProps {
  onSearch: (queryParams: OfficesFormSchema) => void
  filterValues: OfficesFormSchema
}

export const OfficeTabFilterForm: FC<OfficesFormProps> = ({ onSearch, filterValues }) => {
  const { register, handleSubmit } = useForm<OfficesFormSchema>({
    defaultValues: filterValues,
  })

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <FormLayout hasMargin className={elFadeIn}>
        <InputWrap>
          <InputGroup label="Search" placeholder="Search for an office" {...register('name')} />
        </InputWrap>
        <InputWrap>
          <FlexContainer className={elHFull} isFlexGrow1 isFlexAlignEnd>
            <ButtonGroup alignment="left">
              <Button intent="primary" type="submit">
                Search
              </Button>
            </ButtonGroup>
          </FlexContainer>
        </InputWrap>
      </FormLayout>
    </form>
  )
}

export default OfficeTabFilterForm
