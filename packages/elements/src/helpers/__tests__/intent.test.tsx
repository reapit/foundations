import {
  elIntentDanger,
  elIntentNeutral,
  elIntentPrimary,
  elIntentSuccess,
  elIntentPending,
  elIntentWarning,
  elIntentDefault,
} from '../../styles/intent'
import { getIntentClassName } from '../intent'

describe('getIntentClassName', () => {
  it('should get the correct class for primary intent', () => {
    expect(getIntentClassName('primary')).toEqual(elIntentPrimary)
  })

  it('should get the correct class for neutral intent', () => {
    expect(getIntentClassName('neutral')).toEqual(elIntentNeutral)
  })

  it('should get the correct class for success intent', () => {
    expect(getIntentClassName('success')).toEqual(elIntentSuccess)
  })

  it('should get the correct class for pending intent', () => {
    expect(getIntentClassName('pending')).toEqual(elIntentPending)
  })

  it('should get the correct class for warning intent', () => {
    expect(getIntentClassName('warning')).toEqual(elIntentWarning)
  })

  it('should get the correct class for danger intent', () => {
    expect(getIntentClassName('danger')).toEqual(elIntentDanger)
  })

  it('should get the correct class for default intent', () => {
    expect(getIntentClassName('default')).toEqual(elIntentDefault)
  })
})
