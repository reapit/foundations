import React, { ChangeEvent } from 'react'
import { AppEditPage, handleChangeTab } from '..'
import { render, setViewport } from '../../../../tests/react-testing'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import Routes from '../../../../constants/routes'

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

it('should match snapshot for mobile view', () => {
  const testElem = document.createElement('div')
  testElem.id = 'root'
  document.body.appendChild(testElem)

  setViewport('Mobile')
  expect(render(<AppEditPage />)).toMatchSnapshot()
})

describe('handleChangeTab', () => {
  it('should handle tab change', () => {
    const appId = 'MOCK_ID'
    const event = {
      target: {
        value: 'MOCK_VALUE',
      },
    } as ChangeEvent<HTMLInputElement>
    const navigate = jest.fn()

    const curried = handleChangeTab(navigate, appId)

    curried(event)

    expect(navigate).toHaveBeenCalledWith(`${Routes.APPS}/${appId}/edit/${event.target.value}`)
  })
})
