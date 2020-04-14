import Pagination from '../pagination.svelte'
import { render } from '@testing-library/svelte'
import searchWidgetStore from '../../core/store'
import createGoogleMapsMock from '../../utils/__mocks__/mock-google-map'

jest.mock('../../api/properties')
jest.mock('../../api/property-images')

describe('pagination', () => {
  beforeAll(() => {
    createGoogleMapsMock()
  })

  it('it matches a snapshot', () => {
    searchWidgetStore.update(store => ({
      ...store,
      properties: [],
      totalPage: 10,
      pageNumber: 2,
    }))
    const wrapper = render(Pagination)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
