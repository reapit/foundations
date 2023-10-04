import React, { FC, useState } from 'react'
import { BodyText, Button, FormLayout, InputGroup, InputWrap, PageContainer, Title } from '@reapit/elements'
import { useForm } from 'react-hook-form'

export const Apps: FC = () => {
  const [graph, setGraph] = useState(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const { handleSubmit, register } = useForm({})

  const requestResults = async (values) => {
    console.log('values', values)
    setLoading(true)

    const result = await fetch(`https://ai-bi.dev.paas.reapit.cloud`, {
      body: JSON.stringify({ text: values.search }),
      method: 'post',
    })
    setLoading(false)

    console.log('result', result)
  }

  return (
      <PageContainer>
        <Title>Ai BI</Title>
        <BodyText hasGreyText>Enter your BI query below to see results from our database.</BodyText>
        <form onSubmit={handleSubmit(requestResults)}>
          <FormLayout>
            <InputWrap></InputWrap>
            <InputWrap>
              <InputGroup {...register('search')} label="Search" type="text" placeholder='Enter your query here...' />
            </InputWrap>
            <InputWrap>
              <Button loading={loading} intent="primary">Go</Button>
            </InputWrap>
          </FormLayout>
        </form>
        <div id="results">

        </div>
      </PageContainer>
  )
}

export default Apps
