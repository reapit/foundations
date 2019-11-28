import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from '@/styles/blocks/app-sidebar.scss?mod'
import { FlexContainerBasic, H3, Input, H5 } from '@reapit/elements'
import { Formik, Form, FormikValues } from 'formik'
import CategoriesList from '@/components/ui/categories-list'
import { FaSearch } from 'react-icons/fa'
import { CategoryModel } from '@/types/marketplace-api-schema'
import { selectCategories } from '@/selector/app-categories'

import { addQuery, removeQuery, getParamValueFromPath } from '@/utils/client-url-params'

export interface AppSidebarMappedProps {
  categories: CategoryModel[]
}

export type AppSidebarProps = AppSidebarMappedProps & RouteComponentProps

export const AppSidebar: React.FunctionComponent<AppSidebarProps> = ({
  categories,
  location,
  history
}: AppSidebarProps) => {
  const handleSelectCategory = (categoryId?: string) => {
    if (categoryId) {
      history.push(addQuery({ category: categoryId }))
    } else {
      history.push(removeQuery(['category']))
    }
  }

  const handleSearchApp = (values: FormikValues) => {
    const { search } = values
    if (search) {
      history.push(addQuery({ search }))
    } else {
      history.push(removeQuery(['search']))
    }
  }

  return (
    <div className={styles.sidebar}>
      <FlexContainerBasic hasPadding flexColumn>
        <H3>Browse Apps</H3>
        <Formik
          initialValues={{ search: getParamValueFromPath(location.search, 'search') }}
          onSubmit={values => {
            handleSearchApp(values)
          }}
          render={() => (
            <Form>
              <Input id="search" type="text" placeholder="Search..." name="search" rightIcon={<FaSearch />} />
            </Form>
          )}
        />
        <CategoriesList
          selectedCategory={getParamValueFromPath(location.search, 'category')}
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />
      </FlexContainerBasic>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): AppSidebarMappedProps => ({
  categories: selectCategories(state)
})

export default withRouter(connect(mapStateToProps)(AppSidebar))
