import React, { useState } from 'react'
import { mount, shallow } from 'enzyme'
import { HelpGuide } from '..'

const HelpGuideWrapper = () => {
  return (
    <div style={{ padding: 20 }}>
      <HelpGuide>
        <HelpGuide.Step id="step-1" component={() => <div className="step-1">Step 1</div>}></HelpGuide.Step>
        <HelpGuide.Step id="step-2" component={() => <div className="step-2">Step 2</div>}></HelpGuide.Step>
        <HelpGuide.Step id="step-3" component={() => <div className="step-3">Step 3</div>}></HelpGuide.Step>
        <HelpGuide.Step id="step-4" component={() => <div className="step-4">Step 4</div>}></HelpGuide.Step>
      </HelpGuide>
    </div>
  )
}

describe('HelpGuide', () => {
  it('should match a snapshot', () => {
    expect(shallow(<HelpGuideWrapper />)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    expect(
      shallow(<HelpGuide.Step id="step-3" component={() => <div className="step-3">Step 3</div>} />)
    ).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
