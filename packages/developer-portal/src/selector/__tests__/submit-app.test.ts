import { ReduxState } from '@/types/core'
import { selectSubmitAppRevisionState, selectSubmitAppState } from '../submit-app'
import appState from '@/reducers/__stubs__/app-state'

const mockState: ReduxState = {
  ...appState,
  submitRevision: {
    formState: 'PENDING',
  },
  submitApp: {
    formState: 'PENDING',
    loading: false,
    submitAppData: {
      scopes: [
        {
          description: 'test',
          name: 'test',
        },
      ],
    },
  },
}

describe('selectSubmitAppRevisionState', () => {
  it('should run correctly', () => {
    const result = selectSubmitAppRevisionState(mockState)
    expect(result).toEqual({
      formState: 'PENDING',
    })
  })
})

describe('selectSubmitAppState', () => {
  it('should run correctly', () => {
    const result = selectSubmitAppState(mockState)
    expect(result).toEqual({
      formState: 'PENDING',
      loading: false,
      submitAppData: {
        scopes: [
          {
            description: 'test',
            name: 'test',
          },
        ],
      },
    })
  })
})
