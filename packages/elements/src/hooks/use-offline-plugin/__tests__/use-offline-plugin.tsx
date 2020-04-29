import { renderHook, act } from '@testing-library/react-hooks'
import { useOfflinePLugin } from '../use-offline-plugin'
import * as runtime from 'offline-plugin/runtime'

jest.mock('offline-plugin/runtime')

describe('useOfflinePLugin', () => {
  it('should call applyUpdate on event onUpdateReady of the service worker', () => {
    renderHook(() => useOfflinePLugin())
    const mockedInstallFn = runtime.install as jest.Mock

    act(() => {
      mockedInstallFn.mock.calls[0][0].onUpdateReady()
    })

    expect(runtime.applyUpdate).toHaveBeenCalled()
  })

  /* eslint-disable-next-line max-len */
  it('should set isNewVersionAvailable to true when offline-plugin/runtime finish updating service worker with new contents', () => {
    const { result } = renderHook(() => useOfflinePLugin())
    const mockedInstallFn = runtime.install as jest.Mock

    act(() => {
      mockedInstallFn.mock.calls[0][0].onUpdated()
    })

    expect(result.current.isNewVersionAvailable).toBe(true)
  })
})
