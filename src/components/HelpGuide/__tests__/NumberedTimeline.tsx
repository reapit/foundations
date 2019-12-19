import * as React from 'react'
import { shallow } from 'enzyme'
import { NumberedTimeline, generateNumbers } from '../NumberedTimeline'

describe('NumberedTimeline', () => {
  it('should match a snapshot', () => {
    expect(shallow(<NumberedTimeline total={5} currentIndex={3} />)).toMatchSnapshot()
  })

  it('generateNumbers should run correctly', () => {
    ;[[5, [0, 1, 2, 3, 4]], [3, [0, 1, 2]]].forEach(([input, expected]) => {
      expect(generateNumbers(input as number)()).toEqual(expected)
    })
  })
})
