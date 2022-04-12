import React, { ChangeEvent } from 'react'
import { AppEditPage, handleChangeTab } from '..'
import { render } from '../../../../tests/react-testing'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'

jest.mock('../../state/use-app-state')

const mockUseAppState = useAppState as jest.Mock

describe('AppEditPage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppEditPage />)).toMatchSnapshot()
  })

  it('should match snapshot where no app found', () => {
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        appDetail: null,
        appDetailLoading: false,
      },
    })
    expect(render(<AppEditPage />)).toMatchSnapshot()
  })

  it('should match snapshot where loading apps', () => {
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appDetailLoading: true,
      },
    })
    expect(render(<AppEditPage />)).toMatchSnapshot()
  })
})

describe('handleChangeTab', () => {
  it('should handle tab change', () => {
    const setTab = jest.fn()
    const event = {
      target: {
        value: 'MOCK_VALUE',
      },
    } as ChangeEvent<HTMLInputElement>

    const curried = handleChangeTab(setTab)

    curried(event)

    expect(setTab).toHaveBeenCalledWith(event.target.value)
  })
})
