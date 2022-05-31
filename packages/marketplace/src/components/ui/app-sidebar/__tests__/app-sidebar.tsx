import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import { AppSidebar, FilterForm, handleSelectCategory, handleSearchApp } from '../app-sidebar'
import { FormFields, formFields } from '../form-fields'
import { addQuery, removeQuery } from '@/utils/client-url-params'
import { selectCategories } from '@/selector/categories'
import { Formik, FormikProps } from '@reapit/elements-legacy'
import { useHistory, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { CategoryModel } from '@reapit/foundations-ts-definitions'
import { categoriesStub } from '../../../../sagas/__stubs__/categories'

const { search, searchBy } = formFields

jest.mock('@/selector/categories', () => ({
  selectCategories: jest.fn(() => require('@/sagas/__stubs__/categories').categoriesStub.data),
}))
jest.mock('@/utils/client-url-params')
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useHistory: jest.fn(),
  useLocation: jest.fn(() => ({
    search: '?search=app1&$searchBy=appName&page=1',
  })),
}))
jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Object),
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
  ;(useSelector as jest.Mocked<any>).mockImplementation(() => categoriesStub.data as CategoryModel[])
  it('should match a snapshot', () => {
    expect(render(<AppSidebar />)).toMatchSnapshot()
  })

  it('should call all hooks correctly', () => {
    render(<AppSidebar />)
    expect(useHistory).toHaveBeenCalled()
    expect(useLocation).toHaveBeenCalled()
    expect(useSelector).toHaveBeenCalledWith(selectCategories)
  })
})

describe('FilterForm', () => {
  const props = {
    values: {
      [search.name]: '1',
      [searchBy.name]: '1',
    },
  } as FormikProps<FormFields>
  it('should match a snapshot', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <FilterForm {...props} />} />),
    ).toMatchSnapshot()
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
    expect(removeQuery).toHaveBeenCalledWith(['category', search.name, searchBy.name])
    expect(spy).toHaveBeenCalledTimes(1)
  })
})

describe('handleSearchApp', () => {
  it('should call history.push with addQuery({searchApp}) when passed values that have search', () => {
    const values = { [search.name]: 'search' }
    const page = '1'
    const fn = handleSearchApp(history)
    fn(values)
    expect(addQuery).toHaveBeenCalledWith({ [search.name]: values[search.name], page })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call history.push with removeQuery when search is undefined', () => {
    const values = {}
    const fn = handleSearchApp(history)
    fn(values)
    expect(removeQuery).toHaveBeenCalledWith([search.name, searchBy.name])
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
