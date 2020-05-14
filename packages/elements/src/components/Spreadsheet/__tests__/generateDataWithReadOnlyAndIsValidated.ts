import * as Utils from '../utils'
import { Cell } from '../types'

const mockValidatedDataGenerateReturn = 'mockValidatedDataGenerateReturn'
const spyValidatedDataGenerate = jest
  .spyOn(Utils, 'validatedDataGenerate')
  .mockReturnValue((mockValidatedDataGenerateReturn as unknown) as Cell[][])

const mockGenerateInvalidatedRowIndexSetReturn = 'mockGenerateInvalidatedRowIndexSetReturn'
const spyGenerateInvalidatedRowIndexSet = jest
  .spyOn(Utils, 'generateInvalidatedRowIndexSet')
  .mockReturnValue((mockGenerateInvalidatedRowIndexSetReturn as unknown) as Set<number>)

const mockSpyGeneratedDataWithReadOnlyOfValidatedCellBelongedToInvalidatedRowSetToTrueReturn =
  'spyGeneratedDataWithReadOnlyOfValidatedCellBelongedToInvalidatedRowSetToTrue'
const spyGeneratedDataWithReadOnlyOfValidatedCellBelongedToInvalidatedRowSetToTrue = jest
  .spyOn(Utils, 'generatedDataWithReadOnlyOfValidatedCellBelongedToInvalidatedRowSetToTrue')
  .mockReturnValue(
    (mockSpyGeneratedDataWithReadOnlyOfValidatedCellBelongedToInvalidatedRowSetToTrueReturn as unknown) as Cell[][],
  )

const { generateDataWithReadOnlyAndIsValidated } = Utils

describe('generateDataWithReadOnlyAndIsValidated', () => {
  it('should run correctly when allowOnlyOneValidationErrorPerRow = false', () => {
    const mockParams = {
      data: [],
      allowOnlyOneValidationErrorPerRow: false,
      validateFunction: jest.fn(),
    }
    const result = generateDataWithReadOnlyAndIsValidated(mockParams)

    expect(spyValidatedDataGenerate).toHaveBeenCalledWith(mockParams.data, mockParams.validateFunction)
    expect(result).toBe(mockValidatedDataGenerateReturn)
  })

  it('should run correctly when allowOnlyOneValidationErrorPerRow = true', () => {
    const mockParams = {
      data: [],
      allowOnlyOneValidationErrorPerRow: true,
      validateFunction: jest.fn(),
    }
    const result = generateDataWithReadOnlyAndIsValidated(mockParams)

    expect(spyValidatedDataGenerate).toHaveBeenCalledWith(mockParams.data, mockParams.validateFunction)
    expect(spyGenerateInvalidatedRowIndexSet).toHaveBeenCalledWith(mockValidatedDataGenerateReturn)
    expect(spyGeneratedDataWithReadOnlyOfValidatedCellBelongedToInvalidatedRowSetToTrue).toHaveBeenCalledWith({
      data: mockValidatedDataGenerateReturn,
      invalidatedRowIndexSet: mockGenerateInvalidatedRowIndexSetReturn,
    })
    expect(result).toBe(mockSpyGeneratedDataWithReadOnlyOfValidatedCellBelongedToInvalidatedRowSetToTrueReturn)
  })
})
