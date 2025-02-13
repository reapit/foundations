import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { PipelineDnsStepFour } from '../dns-step-four'
import { PipelineDnsStepOne } from '../dns-step-one'
import { PipelineDnsStepThree } from '../dns-step-three'
import { PipelineDnsStepTwo } from '../dns-step-two'

describe('DNS Steps', () => {
  Object.entries({
    one: PipelineDnsStepOne,
    two: PipelineDnsStepTwo,
    three: PipelineDnsStepThree,
    four: PipelineDnsStepFour,
  }).forEach(([key, Element]) => {
    it(`should match snapshot for route ${key}`, () => {
      expect(
        render(<Element verifyDnsName="test" verifyDnsValue="test" customDomain="test" pipelineId="test" />),
      ).toMatchSnapshot()
    })
  })
})
