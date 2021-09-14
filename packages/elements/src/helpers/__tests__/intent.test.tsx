import {
  elIntentCritical,
  elIntentDanger,
  elIntentNeutral,
  elIntentPrimary,
  elIntentSecondary,
  elIntentSuccess,
} from '../../styles/intent'
import { getIntentClassName } from '../intent'
import { elIntentLow } from '../../styles/intent'

describe('getIntentClassName', () => {
  it('should get the correct class for primary intent', () => {
    expect(getIntentClassName('primary')).toEqual(elIntentPrimary)
  })

  it('should get the correct class for secondary intent', () => {
    expect(getIntentClassName('secondary')).toEqual(elIntentSecondary)
  })

  it('should get the correct class for critical intent', () => {
    expect(getIntentClassName('critical')).toEqual(elIntentCritical)
  })

  it('should get the correct class for success intent', () => {
    expect(getIntentClassName('success')).toEqual(elIntentSuccess)
  })

  it('should get the correct class for danger intent', () => {
    expect(getIntentClassName('danger')).toEqual(elIntentDanger)
  })

  it('should get the correct class for neutral intent', () => {
    expect(getIntentClassName('neutral')).toEqual(elIntentNeutral)
  })

  it('should get the correct class for low intent', () => {
    expect(getIntentClassName('low')).toEqual(elIntentLow)
  })
})
