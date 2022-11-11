import React from 'react'
import { render } from '../../tests/react-testing'
import { PrivateRouteWrapper } from '../private-route-wrapper'

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <PrivateRouteWrapper>
          <div />
        </PrivateRouteWrapper>,
      ),
    ).toMatchSnapshot()
  })
})
