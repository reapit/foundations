import React, { FC, useState } from 'react'
import {
  BodyText,
  Button,
  FlexContainer,
  FormLayout,
  InputGroup,
  InputWrap,
  PageContainer,
  PersistentNotification,
  Title,
  elMt8,
} from '@reapit/elements'
import { useForm } from 'react-hook-form'
import { DataVisual, DataVisualPropsType } from './data-visual'
import { cx } from '@linaria/core'

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
          type:
            data.length === 1 && Object.keys(data[0]).length === 1
              ? 'singular'
              : Object.keys(data[0]).length == 2
              ? 'graph'
              : 'table',
          data,
        },
        ...dataSets,
      ])
  }

  return (
    <PageContainer>
      <FlexContainer isFlexAlignCenter isFlexJustifyCenter isFlexColumn>
        <Title>Ai BI</Title>
        <PersistentNotification isExpanded isFullWidth isInline>
          Beta POC. This is a work in progress application intended for internal use only.
        </PersistentNotification>
        <BodyText hasGreyText>Enter your BI query below to see results from our database.</BodyText>
        <BodyText hasGreyText>
          *Currently the AI only has context over the property sales table. This was to make the development of the POC
          a bit simpler. Try the below examples or similar to see results
        </BodyText>
        <ul>
          <li>Show me the average property prices for this year</li>
          <li>Show me the percentage of sales by month for this year</li>
          <li>Average property price for each year</li>
        </ul>
        <BodyText hasGreyText>Please note the responses may take a while.</BodyText>
      </FlexContainer>
      <form className={cx(elMt8)} onSubmit={handleSubmit(requestResults)}>
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
