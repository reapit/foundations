import * as React from 'react'
import styles from '@/styles/blocks/categories-list.scss?mod'
import { CategoryModel } from '@/types/marketplace-api-schema'

export interface CategoryItemProps {
  category?: CategoryModel
  selected: boolean
  onSelectCategory: (categoryId?: string) => void
}

const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
  category,
  selected,
  onSelectCategory
}: CategoryItemProps) => {
  if (!category) {
    return (
      <li className={`${styles.categoryItem} ${selected && styles.categoryItemActive}`}>
        <a
          href="#"
          onClick={event => {
            event.preventDefault()
            onSelectCategory('')
          }}
        >
          All
        </a>
      </li>
    )
  }

  return (
    <li className={`${styles.categoryItem} ${selected && styles.categoryItemActive}`}>
      <a
        href="#"
        onClick={event => {
          event.preventDefault()
          onSelectCategory(category?.id)
        }}
      >
        {category?.name}
      </a>
    </li>
  )
}

export default CategoryItem
