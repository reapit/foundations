import React from 'react'
import { shallow } from 'enzyme'
import { ViewDetailButton, mapDispatchToProps, handleOnClick } from '../view-detail-button'

describe('ViewDetailButton', () => {
  describe('ViewDetailButton', () => {
    it('should match snapshot', () => {
      const onClick = jest.fn()
      const wrapper = shallow(<ViewDetailButton onClick={onClick} />)
      expect(wrapper).toMatchSnapshot()
    })
    it('should run onClick when click button', () => {
      const onClick = jest.fn()
      const wrapper = shallow(<ViewDetailButton onClick={onClick} />)
      wrapper.simulate('click')
      expect(onClick).toBeCalled()
    })
  })
  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const dispatch = jest.fn()
      const ownProps = { id: '1' }
      const result = mapDispatchToProps(dispatch, ownProps)
      expect(result).toBeDefined()
    })
    it('handleOnClick run correctly', () => {
      const dispatch = jest.fn()
      const ownProps = { id: '1' }
      const fn = handleOnClick(dispatch, ownProps)
      fn()
      expect(dispatch).toBeCalled()
    })
    it('handleOnClick will not call when doesnt have id', () => {
      const dispatch = jest.fn()
      const fn = handleOnClick(dispatch, undefined)
      fn()
      expect(dispatch).not.toBeCalled()
    })
  })
})
