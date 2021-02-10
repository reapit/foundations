import grapesjs from 'grapesjs'
import 'grapesjs-preset-webpage'
import { initializeEditor } from '../editor'

jest.mock('../initialize-components')
jest.mock('grapesjs-preset-webpage', () => null)
jest.mock('grapesjs', () => ({
  init: jest.fn(),
}))

describe('initializeEditor', () => {
  it('should call init on grapesjs', async () => {
    await initializeEditor({ identifier: 'some-string' })

    expect(grapesjs.init).toHaveBeenCalledTimes(1)
  })
})
