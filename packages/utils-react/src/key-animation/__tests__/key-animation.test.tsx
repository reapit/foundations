import React from 'react'
import { mount } from 'enzyme'
import { KeyAnimation } from '../key-animation'

describe('Key Animation', () => {
  it('step 1 should match a snapshot', () => {
    expect(mount(<KeyAnimation step={1} />)).toMatchSnapshot()
  })

  it('step 2 should match a snapshot', () => {
    expect(mount(<KeyAnimation step={2} />)).toMatchSnapshot()
  })

  it('step 3 should match a snapshot', () => {
    expect(mount(<KeyAnimation step={3} />)).toMatchSnapshot()
  })
})
