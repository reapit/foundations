import * as React from 'react'
import styles from '@/styles/blocks/categories-list.scss?mod'
import { CategoryModel } from '@reapit/foundations-ts-definitions'

export interface CategoryItemProps {
  category?: CategoryModel
  selected: boolean
  onSelectCategory: (categoryId?: string) => void
}

const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
  category,
  selected,
  onSelectCategory,
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
        data-test-category-id={category?.id}
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
