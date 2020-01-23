import * as React from 'react'
import { shallow } from 'enzyme'
import {
  AppSidebar,
  AppSidebarProps,
  FilterForm,
  handleSelectCategory,
  handleSearchApp,
  mapStateToProps,
  FilterFormValues
} from '../app-sidebar'
import CategoriesList from '@/components/ui/categories-list'
import { addQuery, removeQuery, getParamValueFromPath } from '@/utils/client-url-params'
import { appCategorieStub } from '../../../sagas/__stubs__/app-categories'
import { selectCategories } from '@/selector/app-categories'
import { ReduxState } from '@/types/core'
import { FormikProps } from '@reapit/elements'
import { mockWithFormik } from '@/utils/mock-formik'

jest.mock('@/selector/app-categories')
jest.mock('@/utils/client-url-params')

const history = {
  push: jest.fn()
}

const spy = jest.spyOn(history, 'push')

afterEach(() => {
  spy.mockClear()
})

const props = {
  categories: appCategorieStub.data || [],
  location: {
    search: 'page=1'
  }
} as AppSidebarProps

describe('AppSidebar', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AppSidebar {...props} />)).toMatchSnapshot()
  })

  it('should contain list categories', () => {
    const wrapper = shallow(<AppSidebar {...props} />)
    expect(wrapper.find(CategoriesList)).toHaveLength(1)
  })

  describe('FilterForm', () => {
    const props = {
      values: {
        search: '1',
        searchBy: '1'
      }
    } as FormikProps<FilterFormValues>
    it('should match a snapshot', () => {
      expect(shallow(<FilterForm {...props} />)).toMatchSnapshot()
    })
  })

  describe('handleSelectCategory', () => {
    it('should call history.push with addQuery({categoryId}) when passed categoryId', () => {
      const categoryId = '1'
      const fn = handleSelectCategory(history)
      fn(categoryId)
      expect(addQuery).toHaveBeenCalledWith({ category: categoryId })
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should call history.push with removeQuery when categoryId is undefined', () => {
      const fn = handleSelectCategory(history)
      fn()
      expect(removeQuery).toHaveBeenCalledWith(['category', 'search', 'searchBy'])
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('handleSearchApp', () => {
    it('should call history.push with addQuery({searchApp}) when passed values that have search', () => {
      const values = { search: 'search' }
      const fn = handleSearchApp(history)
      fn(values)
      expect(addQuery).toHaveBeenCalledWith({ search: values.search })
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should call history.push with removeQuery when search is undefined', () => {
      const values = {}
      const fn = handleSearchApp(history)
      fn(values)
      expect(removeQuery).toHaveBeenCalledWith(['search', 'searchBy'])
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('mapStateToProps', () => {
    it('should call selectCategories', () => {
      const mockState = ({ categories: appCategorieStub } as unknown) as ReduxState
      mapStateToProps(mockState)
      expect(selectCategories).toBeCalledWith(mockState)
    })
  })
})
