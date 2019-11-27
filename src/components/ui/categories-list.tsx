import * as React from 'react'
import styles from '@/styles/blocks/categories-list.scss?mod'
import { CategoryModel } from '@/types/marketplace-api-schema'

export interface CategoriesListProps {
  categories: CategoryModel[]
}

const CategoriesList: React.FunctionComponent<CategoriesListProps> = ({ categories }: CategoriesListProps) => {
  return (
    <ul className={styles.listCategories}>
      {categories.map(category => (
        <li key={category.id} className={`${styles.categoryItem} ${styles.categoryItemActive}`}>
          <a>{category.name}</a>
        </li>
      ))}
    </ul>
  )
}

export default CategoriesList
