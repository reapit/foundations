import { handleLaunchApp } from '../launch-app'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

jest.mock('../../core/store')

describe('handleLaunchApp', () => {
  it('should run correctly', () => {
    const mockApp = {
      homePage: '',
      id: '123',
    } as AppSummaryModel
    handleLaunchApp(mockApp)
    expect(window.location.href).toEqual('')
  })
})
