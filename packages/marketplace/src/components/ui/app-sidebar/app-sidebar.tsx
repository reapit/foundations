import * as React from 'react'
import { useSelector } from 'react-redux'
import { FlexContainerBasic, H5, Input, Formik, Form, RadioSelect, FormikProps, H6 } from '@reapit/elements'
import { useHistory, useLocation } from 'react-router'
import styles from '@/styles/blocks/app-sidebar.scss?mod'
import CategoriesList from '@/components/ui/categories-list'
import { FaSearch } from 'react-icons/fa'
import { CategoryModel } from '@reapit/foundations-ts-definitions'
import { selectCategories } from '@/selector/categories'
import { addQuery, removeQuery, getParamValueFromPath } from '@/utils/client-url-params'
import { cleanObject } from '@reapit/utils'
import { validationSchema } from './validation-schema'
import { FormFields, formFields } from './form-fields'

const { search, searchBy } = formFields

export const filterOptions = [
  { label: 'By App Name', value: 'appName' },
  { label: 'By Company', value: 'companyName' },
]

export interface History {
  push: (path: string) => void
}

export const handleSelectCategory = (history: History) => (categoryId?: string) => {
  if (categoryId) {
    history.push(addQuery({ category: categoryId, page: '1' }))
  } else {
    history.push(removeQuery(['category', search.name, searchBy.name]))
  }
}

export const handleSearchApp = (history: History) => (values: FormFields) => {
  const cleanValues = cleanObject(values)

  const { search: searchValue, searchBy: searchByValue } = cleanValues
  if (searchValue) {
    history.push(addQuery({ [search.name]: searchValue, [searchBy.name]: searchByValue, page: '1' }))
  } else {
    history.push(removeQuery([search.name, searchBy.name]))
  }
}

export const FilterForm: React.FC<FormikProps<FormFields>> = ({ values, setFieldValue }) => {
  const { search, searchBy } = formFields
  return (
    <Form>
      <Input
        id={search.name}
        type="text"
        placeholder="Search..."
        name={search.name}
        rightIcon={
          <button className={styles.btnSearch} type="submit">
            <FaSearch />
          </button>
        }
      />
      <RadioSelect
        id={searchBy.name}
        name={searchBy.name}
        state={values.searchBy}
        options={filterOptions}
        setFieldValue={setFieldValue}
      />
    </Form>
  )
}

export const AppSidebar: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const categories: CategoryModel[] = useSelector(selectCategories)

  // currently, this will make the "Direct Api" option behave like a category,
  // not a checkbox filter, so future ticket may refer back to this.
  const categoriesWithDirectApiOption = [...categories, { id: 'DIRECT_API_APPS_FILTER', name: 'Direct API' }]
  return (
    <div className={styles.sidebar}>
      <FlexContainerBasic flexColumn hasPadding>
        <div className={styles.sidebarWrap}>
          <H5>Browse Apps</H5>
          <H6 className={styles.subHeading}>Search</H6>
          <Formik
            enableReinitialize={true}
            initialValues={{
              [search.name]: getParamValueFromPath(location.search, search.name),
              [searchBy.name]: getParamValueFromPath(location.search, searchBy.name) || 'appName',
            }}
            validationSchema={validationSchema}
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

export default AppSidebar
