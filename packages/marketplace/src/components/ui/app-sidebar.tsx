import * as React from 'react'
import { connect } from 'react-redux'
import { FlexContainerBasic, H3, Input, Formik, Form, RadioSelect, FormikProps, H6 } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from '@/styles/blocks/app-sidebar.scss?mod'
import CategoriesList from '@/components/ui/categories-list'
import { FaSearch } from 'react-icons/fa'
import { CategoryModel } from '@reapit/foundations-ts-definitions'
import { selectCategories } from '@/selector/app-categories'

import { addQuery, removeQuery, getParamValueFromPath } from '@/utils/client-url-params'

export const filterOptions = [
  { label: 'By App Name', value: 'appName' },
  { label: 'By Company', value: 'companyName' }
]

export interface AppSidebarMappedProps {
  categories: CategoryModel[]
}

export type AppSidebarProps = AppSidebarMappedProps & RouteComponentProps

export interface History {
  push: (path: string) => void
}

export interface FilterFormValues {
  search?: string
  searchBy?: string
}

export const handleSelectCategory = (history: History) => (categoryId?: string) => {
  if (categoryId) {
    history.push(addQuery({ category: categoryId }))
  } else {
    history.push(removeQuery(['category', 'search', 'searchBy']))
  }
}

export const handleSearchApp = (history: History) => (values: FilterFormValues) => {
  const { search, searchBy } = values
  if (search) {
    history.push(addQuery({ search, searchBy }))
  } else {
    history.push(removeQuery(['search', 'searchBy']))
  }
}

export const FilterForm: React.FC<FormikProps<FilterFormValues>> = ({ values, setFieldValue }) => {
  return (
    <Form>
      <Input
        id="search"
        type="text"
        placeholder="Search..."
        name="search"
        rightIcon={
          <button className={styles.btnSearch} type="submit">
            <FaSearch />
          </button>
        }
      />
      <RadioSelect
        id="searchBy"
        name="searchBy"
        state={values.searchBy}
        options={filterOptions}
        setFieldValue={setFieldValue}
      />
    </Form>
  )
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ categories, location, history }: AppSidebarProps) => {
  // currently, this will make the "Direct Api" option behave like a category,
  // not a checkbox filter, so future ticket may refer back to this.
  const categoriesWithDirectApiOption = [...categories, { id: 'DIRECT_API_APPS_FILTER', name: 'Direct API' }]
  return (
    <div className={styles.sidebar}>
      <FlexContainerBasic flexColumn hasPadding>
        <div className={styles.sidebarWrap}>
          <H3>Browse Apps</H3>
          <H6 className={styles.subHeading}>Search</H6>
          <Formik
            enableReinitialize={true}
            initialValues={
              {
                search: getParamValueFromPath(location.search, 'search'),
                searchBy: getParamValueFromPath(location.search, 'searchBy') || 'appName'
              } as FilterFormValues
            }
            onSubmit={handleSearchApp(history)}
            component={FilterForm}
          />
        </div>
        <div className={styles.sidebarWrap}>
          <H6 className={styles.subHeading}>Filter</H6>
          <CategoriesList
            selectedCategory={getParamValueFromPath(location.search, 'category')}
            categories={categoriesWithDirectApiOption}
            onSelectCategory={handleSelectCategory(history)}
          />
        </div>
      </FlexContainerBasic>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): AppSidebarMappedProps => ({
  categories: selectCategories(state)
})

export default withRouter(connect(mapStateToProps)(AppSidebar))
