import { ReduxState } from '@/types/core'
import { CategoryModel } from '@reapit/foundations-ts-definitions'

export const selectCategories = (state: ReduxState): CategoryModel[] => {
  return state?.categories?.list?.data || []
}
