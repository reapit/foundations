import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { AppSidebar, FilterForm, handleSelectCategory, handleSearchApp } from '../app-sidebar'
import { FormFields } from '../form-fields'
import { addQuery, removeQuery } from '@/utils/client-url-params'
import { appCategorieStub } from '@/sagas/__stubs__/app-categories'
import { selectCategories } from '@/selector/app-categories'
import { FormikProps } from '@reapit/elements'
import { useHistory, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { CategoryModel } from '@reapit/foundations-ts-definitions'

jest.mock('@/selector/app-categories', () => ({
  selectCategories: jest.fn(() => appCategorieStub.data),
}))
jest.mock('@/utils/client-url-params')
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useLocation: jest.fn(() => ({
    search: '?search=app1&searchBy=appName&page=1',
  })),
}))
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

const history = {
  push: jest.fn(),
}

const spy = jest.spyOn(history, 'push')

afterEach(() => {
  spy.mockClear()
})

describe('AppSidebar', () => {
  afterAll(() => {
    ;(useSelector as jest.Mocked<any>).mockReset()
  })
  ;(useSelector as jest.Mocked<any>).mockImplementation(() => appCategorieStub.data as CategoryModel[])
  it('should match a snapshot', () => {
    expect(shallow(<AppSidebar />)).toMatchSnapshot()
  })

  it('should call all hooks correctly', () => {
    mount(<AppSidebar />)
    expect(useHistory).toHaveBeenCalled()
    expect(useLocation).toHaveBeenCalled()
    expect(useSelector).toHaveBeenCalledWith(selectCategories)
  })
})

describe('FilterForm', () => {
  const props = {
    values: {
      search: '1',
      searchBy: '1',
    },
  } as FormikProps<FormFields>
  it('should match a snapshot', () => {
    expect(shallow(<FilterForm {...props} />)).toMatchSnapshot()
  })
})

describe('handleSelectCategory', () => {
  it('should call history.push with addQuery({categoryId}) when passed categoryId', () => {
    const categoryId = '1'
    const page = '1'
    const fn = handleSelectCategory(history)
    fn(categoryId)
    expect(addQuery).toHaveBeenCalledWith({ category: categoryId, page })
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
    const page = '1'
    const fn = handleSearchApp(history)
    fn(values)
    expect(addQuery).toHaveBeenCalledWith({ search: values.search, page })
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
