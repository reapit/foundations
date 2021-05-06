import * as React from 'react'
import { mount } from 'enzyme'
import ContactDrawer from '../'

const vendorNoPhoneNumbers = {
  id: '1',
  name: 'Joe Bloggs',
  type: undefined,
  homePhone: undefined,
  workPhone: undefined,
  mobilePhone: undefined,
  email: undefined,
}
const vendorWith1PhoneNumber = {
  id: '2',
  name: 'Joe Bloggs',
  type: undefined,
  homePhone: undefined,
  workPhone: undefined,
  mobilePhone: '0421774271',
  email: undefined,
}
const vendorWith3PhoneNumbers = {
  id: '3',
  name: 'Joe Bloggs',
  type: undefined,
  homePhone: '0421774271',
  workPhone: '0421774271',
  mobilePhone: '0421774271',
  email: undefined,
}
const secondVendorWith3PhoneNumbers = {
  id: '3',
  name: 'Joe Bloggs',
  type: undefined,
  homePhone: '0421774271',
  workPhone: '0421774271',
  mobilePhone: '0421774271',
  email: undefined,
}

describe('ContactDrawer component', () => {
  it('should match a snapshot when a contact has no phone numbers', () => {
    const wrapper = mount(<ContactDrawer isOpen handleClose={() => {}} contacts={[vendorNoPhoneNumbers]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when a contact has 1 phone number', () => {
    const wrapper = mount(<ContactDrawer isOpen handleClose={() => {}} contacts={[vendorWith1PhoneNumber]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when a vendor has 3 phone numbers', () => {
    const wrapper = mount(<ContactDrawer isOpen handleClose={() => {}} contacts={[vendorWith3PhoneNumbers]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when there are 2 contacts', () => {
    const wrapper = mount(
      <ContactDrawer
        isOpen
        handleClose={() => {}}
        contacts={[vendorWith3PhoneNumbers, secondVendorWith3PhoneNumbers]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

// describe('PhoneRow component', () => {
//   it('should render a whatsapp symbol if the number is correct', () => {
//     const wrapper = shallow(<P isOpen handleClose={() => {}} contacts={[vendorNoPhoneNumbers]} />)
//     expect(wrapper).toMatchSnapshot()
//   })
//
//   it('should not render a whatsapp symbol if the number isnt correct', () => {
//     const wrapper = shallow(<ContactDrawer isOpen handleClose={() => {}} contacts={[vendorWith1PhoneNumber]} />)
//     expect(wrapper).toMatchSnapshot()
//   })
//
//   it('should match a snapshot when a vendor has 3 phone numbers', () => {
//     const wrapper = shallow(<ContactDrawer isOpen handleClose={() => {}} contacts={[vendorWith3PhoneNumbers]} />)
//     expect(wrapper).toMatchSnapshot()
//   })
//
//   it('should match a snapshot when there are 2 contacts', () => {
//     const wrapper = shallow(
//       <ContactDrawer
//         isOpen
//         handleClose={() => {}}
//         contacts={[vendorWith3PhoneNumbers, secondVendorWith3PhoneNumbers]}
//       />,
//     )
//     expect(wrapper).toMatchSnapshot()
//   })
// })
