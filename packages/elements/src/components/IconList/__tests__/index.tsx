import * as React from 'react'
import { shallow } from 'enzyme'
import { IconList } from '..'
import { items } from '../icon-list.stories'
import toJson from 'enzyme-to-json'

describe('IconList', () => {
  it('should match a snapshot with custom props', () => {
    expect(
      toJson(
        shallow(
          <IconList
            items={items}
            textClassName="text-class-name"
            listClassName="list-class-name"
            iconClassName="icon-class-name"
          />
        )
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot with default props', () => {
    expect(toJson(shallow(<IconList items={items} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
