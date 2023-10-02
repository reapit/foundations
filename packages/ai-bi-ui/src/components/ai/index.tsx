import React, { FC } from 'react'
import { BodyText, Button, FormLayout, InputGroup, InputWrap, PageContainer, Title } from '@reapit/elements'

export const Apps: FC = () => {

  return (
      <PageContainer>
        <Title>Ai BI</Title>
        <BodyText hasGreyText>Enter your BI query below to see results from our database.</BodyText>
        <FormLayout>
          <InputWrap></InputWrap>
          <InputWrap>
            <InputGroup label="Search" type="text" placeholder='Enter your query here...' />
          </InputWrap>
          <InputWrap>
            <Button intent="primary">Go</Button>
          </InputWrap>
        </FormLayout>
        <div id="results">

        </div>
      </PageContainer>
  )
}

export default Apps
