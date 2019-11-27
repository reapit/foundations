import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { ClientState } from '@/reducers/client'
import styles from '@/styles/blocks/app-sidebar.scss?mod'
import { FlexContainerBasic, H3, Input, H5 } from '@reapit/elements'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import CategoriesList from '@/components/ui/categories-list'
import { FaSearch } from 'react-icons/fa'
import { CategoryModel } from '@/types/marketplace-api-schema'
import { selectCategories } from '@/selector/app-categories'
import { clientSearchApps } from '@/actions/client'

export interface AppSidebarMappedProps {
  categories: CategoryModel[]
}

export interface AppSidebarMappedActions {
  searchApps: (keyword: string) => void // keyword maybe appName or developer company
}

export type AppSidebarProps = AppSidebarMappedProps & AppSidebarMappedActions

export const AppSidebar: React.FunctionComponent<AppSidebarProps> = ({ categories, searchApps }: AppSidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <FlexContainerBasic hasPadding flexColumn>
        <H3>Browse Apps</H3>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={values => {
            searchApps(values.search)
          }}
          render={() => (
            <Form>
              <Input id="search" type="text" placeholder="Search..." name="search" rightIcon={<FaSearch />} />
            </Form>
          )}
        />
        <CategoriesList categories={categories} />
      </FlexContainerBasic>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): AppSidebarMappedProps => ({
  categories: selectCategories(state)
})

export const mapDispatchToProps = (dispatch: any): AppSidebarMappedActions => ({
  searchApps: (keyword: string) => dispatch(clientSearchApps(keyword))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar)
