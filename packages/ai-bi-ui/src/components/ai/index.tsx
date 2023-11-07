import React, { FC, useState } from 'react'
import {
  BodyText,
  Button,
  FlexContainer,
  FormLayout,
  InputGroup,
  InputWrap,
  PageContainer,
  Title,
} from '@reapit/elements'
import { useForm } from 'react-hook-form'
import { DataVisual, DataVisualPropsType } from './data-visual'

export const Apps: FC = () => {
  const [dataSets, setDataSets] = useState<DataVisualPropsType<any>[]>([] as DataVisualPropsType<any>[])
  const [loading, setLoading] = useState<boolean>(false)

  const { handleSubmit, register } = useForm({})

  const requestResults = async (values) => {
    setLoading(true)

    const result = await fetch('https://ai-bi.dev.paas.reapit.cloud', {
      body: JSON.stringify({ text: values.search }),
      method: 'post',
    })

    const data = await result.json()

    setLoading(false)
    if (data)
      setDataSets([
        {
          question: values.search,
          type: data.length === 1 && Object.keys(data[0]).length === 1 ? 'singular' : Object.keys(data[0]).length == 2 ? 'graph' : 'table',
          data,
        },
        ...dataSets,
      ])
  }

  return (
    <PageContainer>
      <FlexContainer isFlexAlignCenter isFlexJustifyCenter isFlexColumn>
        <Title>Ai BI</Title>
        <BodyText hasGreyText>Enter your BI query below to see results from our database.</BodyText>
      </FlexContainer>
      <form onSubmit={handleSubmit(requestResults)}>
        <FormLayout>
          <InputWrap></InputWrap>
          <InputWrap>
            <InputGroup {...register('search')} type="text" placeholder="Enter your query here..." />
          </InputWrap>
          <InputWrap>
            <Button loading={loading} intent="primary">
              Go
            </Button>
          </InputWrap>
        </FormLayout>
      </form>
      <div id="results">
        {dataSets.map((set) => (
          <DataVisual key={set.question} {...set} />
        ))}
      </div>
    </PageContainer>
  )
}

export default Apps
