import * as React from 'react'
import CategoryItem from './category-item'
import styles from '@/styles/blocks/categories-list.scss?mod'
import { CategoryModel } from '@/types/marketplace-api-schema'

export interface CategoriesListProps {
  categories: CategoryModel[]
  selectedCategory?: string
  onSelectCategory: (categoryId?: string) => void
}

const CategoriesList: React.FunctionComponent<CategoriesListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoriesListProps) => {
  return (
    <ul className={styles.listCategories}>
      {categories.length > 0 && <CategoryItem selected={!selectedCategory} onSelectCategory={onSelectCategory} />}
      {categories.map(category => (
        <CategoryItem
          category={category}
          key={category.id?.toString() || ''}
          selected={category.id?.toString() === selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      ))}
    </ul>
  )
}

export default CategoriesList
