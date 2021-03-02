import * as utils from '../utils'
import { Cell } from '../types'

const mockValidatedDataGenerateReturn = 'mockValidatedDataGenerateReturn'
const spyValidatedDataGenerate = jest
  .spyOn(utils, 'validatedDataGenerate')
  .mockReturnValue((mockValidatedDataGenerateReturn as unknown) as Cell[][])

const mockGenerateInvalidatedRowIndexSetReturn = 'mockGenerateInvalidatedRowIndexSetReturn'
const spyGenerateInvalidatedRowIndexSet = jest
  .spyOn(utils, 'generateInvalidatedRowIndexSet')
  .mockReturnValue((mockGenerateInvalidatedRowIndexSetReturn as unknown) as Set<number>)

const mockSpyGenerateDataWithReadOnlyReturn = 'spygenerateDataWithReadOnly'
const spygenerateDataWithReadOnly = jest
  .spyOn(utils, 'generateDataWithReadOnly')
  .mockReturnValue((mockSpyGenerateDataWithReadOnlyReturn as unknown) as Cell[][])

xdescribe('generateDataWithReadOnlyAndIsValidated', () => {
  it('should run correctly when allowOnlyOneValidationErrorPerRow = false', () => {
    const mockParams = {
      data: [],
      allowOnlyOneValidationErrorPerRow: false,
      validateFunction: jest.fn(),
    }
    const result = utils.generateDataWithReadOnlyAndIsValidated(mockParams)

    expect(spyValidatedDataGenerate).toHaveBeenCalledWith(mockParams.data, mockParams.validateFunction)
    expect(result).toBe(mockValidatedDataGenerateReturn)
  })

  it('should run correctly when allowOnlyOneValidationErrorPerRow = true', () => {
    const mockParams = {
      data: [],
      allowOnlyOneValidationErrorPerRow: true,
      validateFunction: jest.fn(),
    }
    const result = utils.generateDataWithReadOnlyAndIsValidated(mockParams)

    expect(spyValidatedDataGenerate).toHaveBeenCalledWith(mockParams.data, mockParams.validateFunction)
    expect(spyGenerateInvalidatedRowIndexSet).toHaveBeenCalledWith(mockValidatedDataGenerateReturn)
    expect(spygenerateDataWithReadOnly).toHaveBeenCalledWith({
      data: mockValidatedDataGenerateReturn,
      invalidatedRowIndexSet: mockGenerateInvalidatedRowIndexSetReturn,
    })
    expect(result).toBe(mockSpyGenerateDataWithReadOnlyReturn)
  })
})
