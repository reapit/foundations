import { PagedResultCategoryModel_ } from '../../types/marketplace-api-schema'

export const appCategorieStub: PagedResultCategoryModel_ = {
  data: [
    {
      id: '3',
      name: 'Game',
      description: 'apps for game'
    },
    {
      id: '2',
      name: 'entertainment',
      description: 'apps for entertainment'
    },
    {
      id: '1',
      name: 'education',
      description: 'apps for education'
    }
  ],
  pageNumber: 1,
  pageSize: 15,
  pageCount: 3,
  totalCount: 3
}
