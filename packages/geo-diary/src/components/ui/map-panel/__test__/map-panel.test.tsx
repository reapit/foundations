import React from 'react'
import { shallow } from 'enzyme'
import { MapPanel } from '../map-panel'

jest.mock('../../../../core/app-state')

describe('MapPanel', () => {
  it('should match snapshot without an appointment in state', () => {
    expect(
      shallow(
        <MapPanel
          routeInformation={{ duration: { text: 'TEXT', value: 1000 }, distance: { text: 'TEXT', value: 1000 } }}
        />,
      ),
    ).toMatchSnapshot()
  })
})
