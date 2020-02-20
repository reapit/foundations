import { fetcher } from '@reapit/elements'
import { callGetAreasAPI, callGetAreaByIdAPI, callUpdateArea, callCreateAreaAPI } from '../api'
import { area } from '../__mocks__/area'
import { areas } from '../__mocks__/areas'
import { createAreaArgs } from '../__mocks__/createArea'
import { updateAreaArgs } from '../__mocks__/updateArea'
import { mockContext } from '../../../__mocks__/context'

jest.mock('@reapit/elements', () => ({
  fetcher: jest.fn(),
}))

jest.mock('../../../logger')
jest.mock('../../../errors')

afterEach(() => {
  jest.resetAllMocks()
})

describe('callGetAreaByIdAPI', () => {
  it('should return area when success', async () => {
    ;(fetcher as any).mockImplementation(() => Promise.resolve(area))
    const result = await callGetAreaByIdAPI({ id: area.id }, mockContext)
    expect(result).toEqual(area)
  })

  it('should catch when fail', async () => {
    ;(fetcher as any).mockImplementation(() => Promise.reject('error'))
    try {
      await callGetAreaByIdAPI({ id: area.id }, mockContext)
    } catch (error) {
      expect(error).toBe('error')
    }
  })
})

describe('callGetAreasAPI', () => {
  it('should return areas when success', async () => {
    ;(fetcher as any).mockImplementation(() => Promise.resolve(areas))
    const result = await callGetAreasAPI({}, mockContext)
    expect(result).toEqual(areas)
  })

  it('should catch when fail', async () => {
    ;(fetcher as any).mockImplementation(() => Promise.reject('error'))
    try {
      await callGetAreasAPI({}, mockContext)
    } catch (error) {
      expect(error).toBe('error')
    }
  })
})

describe('callCreateAreasAPI', () => {
  it('should return true when success', async () => {
    ;(fetcher as any).mockImplementation(() => Promise.resolve(true))
    const result = await callCreateAreaAPI(createAreaArgs, mockContext)
    expect(result).toEqual(true)
  })

  it('should catch when fail', async () => {
    ;(fetcher as any).mockImplementation(() => Promise.reject('error'))
    try {
      await callCreateAreaAPI(createAreaArgs, mockContext)
    } catch (error) {
      expect(error).toBe('error')
    }
  })
})

describe('callUpdateAreasAPI', () => {
  it('should return true when success', async () => {
    ;(fetcher as any).mockImplementation(() => Promise.resolve(true))
    const result = await callUpdateArea(updateAreaArgs, mockContext)
    expect(result).toEqual(true)
  })

  it('should catch when fail', async () => {
    ;(fetcher as any).mockImplementation(() => Promise.reject('error'))
    try {
      await callUpdateArea(updateAreaArgs, mockContext)
    } catch (error) {
      expect(error).toBe('error')
    }
  })
})
