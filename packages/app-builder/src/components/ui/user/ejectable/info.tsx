import { useObjectGet } from '../../../../components/hooks/objects/use-object-get'
import { usePageId } from '../../../../components/hooks/use-page-id'
import React, { forwardRef } from 'react'
import { FormLayout, InputWrap, Label, Loader } from '@reapit/elements'
import { ComponentWrapper, ContainerProps } from './container'
import { Text } from './text'

export type InfoProps = ContainerProps & {
  typeName?: string
}

export const Info = forwardRef<HTMLDivElement, InfoProps>(({ typeName, ...props }, ref) => {
  const { context } = usePageId()
  const id = Object.values(context)[0] as string | undefined
  const { data, loading } = useObjectGet(typeName, id)

  if (loading) {
    return <Loader />
  }

  return (
    <ComponentWrapper ref={ref} {...props}>
      <FormLayout>
        {data &&
          Object.entries(data).map(([key, value]) => (
            <InputWrap key={key}>
              <Label>{key}</Label>
              <Text text={value as string} />
            </InputWrap>
          ))}
      </FormLayout>
    </ComponentWrapper>
  )
})
