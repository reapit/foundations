import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AppCard, { AppCardProps } from '../app-card'

const props: AppCardProps = {
  id: '9xhsdY7',
  appName: 'My app',
  developerId: 'J7sxm91',
  developerName: 'John Doe',
  displayImage: './img/my-app.png',
  displayText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}

describe('AppCard', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AppCard {...props} />))).toMatchSnapshot()
  })
})

describe('Should allow pass custom CSS classes', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<AppCard {...props} className="addition css className" />)
    expect(wrapper.find('.addition.css.className')).toHaveLength(1)
  })
})
