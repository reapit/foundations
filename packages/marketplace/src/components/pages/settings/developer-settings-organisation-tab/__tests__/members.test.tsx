import React from 'react'
import { Members, CellName } from '../members'
import { shallow } from 'enzyme'

describe('Members', () => {
  test('CellName should match snapshots', () => {
    expect(
      shallow(
        <CellName
          row={{
            original: {
              email: '',
              title: '',
            },
          }}
        />,
      ),
    ).toMatchSnapshot()
  })
  it('should match a snapshot when no error', () => {
    expect(shallow(<Members />)).toMatchSnapshot()
  })
})
