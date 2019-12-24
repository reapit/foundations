import * as React from 'react'
import { connect } from 'react-redux'
import { FlexContainerBasic, H3, Input, Formik, Form, FormikValues } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from '@/styles/blocks/app-sidebar.scss?mod'
import CategoriesList from '@/components/ui/categories-list'
import { FaSearch } from 'react-icons/fa'
import { CategoryModel } from '@reapit/foundations-ts-definitions'
import { selectCategories } from '@/selector/app-categories'

import { addQuery, removeQuery, getParamValueFromPath } from '@/utils/client-url-params'

export interface AppSidebarMappedProps {
  categories: CategoryModel[]
}

export type AppSidebarProps = AppSidebarMappedProps & RouteComponentProps

export interface History {
  push: (path: string) => void
}

export const handleSelectCategory = (history: History) => (categoryId?: string) => {
  if (categoryId) {
    history.push(addQuery({ category: categoryId }))
  } else {
    history.push(removeQuery(['category', 'search']))
  }
}

export const handleSearchApp = (history: History) => (values: FormikValues) => {
  const { search } = values
  if (search) {
    history.push(addQuery({ search }))
  } else {
    history.push(removeQuery(['search']))
  }
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ categories, location, history }: AppSidebarProps) => {
  // currently, this will make the "Direct Api" option behave like a category, not a checkbox filter, so future ticket may refer back to this.
  const categoriesWithDirectApiOption = [...categories, { id: 'DIRECT_API_APPS_FILTER', name: 'Direct API' }]
  return (
    <div className={styles.sidebar}>
      <FlexContainerBasic hasPadding flexColumn>
        <H3>Browse Apps</H3>
        <Formik
          enableReinitialize={true}
          initialValues={{ search: getParamValueFromPath(location.search, 'search') }}
          onSubmit={handleSearchApp(history)}
        >
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
          </Form>
        </Formik>
        <CategoriesList
          selectedCategory={getParamValueFromPath(location.search, 'category')}
          categories={categoriesWithDirectApiOption}
          onSelectCategory={handleSelectCategory(history)}
        />
      </FlexContainerBasic>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): AppSidebarMappedProps => ({
  categories: selectCategories(state)
})

export default withRouter(connect(mapStateToProps)(AppSidebar))
