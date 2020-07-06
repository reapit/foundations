import { handleUseEffectToTriggerAutoSave, handleUseEffectToSetValueToCurrentRef } from '../formik-auto-save'

const mockOnSave = jest.fn()

describe('FormikAutoSave', () => {
  describe('handleUseEffectToSetValueToCurrentRef', () => {
    it('should run correctly', () => {
      const mockRef = {
        current: null,
      }
      const mockValue = 'Test'
      const fn = handleUseEffectToSetValueToCurrentRef(mockValue, mockRef)
      fn()
      expect(mockRef.current).toEqual(mockValue)
    })
  })
  describe('handleUseEffectToTriggerAutoSave', () => {
    it('should run correctly', () => {
      const mockPrevValues = {
        name: 'Test',
        age: 13,
      }
      const mockValues = {
        name: 'Test User',
        age: 13,
      }
      const fn = handleUseEffectToTriggerAutoSave(mockPrevValues, mockValues, mockOnSave)
      fn()
      expect(mockOnSave).toBeCalledWith(mockValues)
    })
  })
})
