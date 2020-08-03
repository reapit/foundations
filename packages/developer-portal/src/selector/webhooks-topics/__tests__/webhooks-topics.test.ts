import { ReduxState } from '@/types/core'
import { selectTopicsData } from '../webhooks-topics'
import { topics } from '@/sagas/__stubs__/webhooks'
import appState from '@/reducers/__stubs__/app-state'

const input = {
  ...appState,
  webhooksTopics: {
    list: {
      ...topics,
      isLoading: false,
      errorMessage: '',
    },
  },
} as ReduxState

describe('webhooks-topics', () => {
  describe('selectTopicsData', () => {
    it('should run correctly', () => {
      const result = selectTopicsData(input)
      expect(result).toEqual(topics._embedded)
    })
  })
})
