import { ERROR_MESSAGES } from '@/constants/errors'

export const validate = values => {
  const errors: any = {}
  const hexCodeRegex = /^#[0-9A-F]{6}$/i

  if (values.logo === '') {
    errors.logo = ERROR_MESSAGES.MISSING_LOGO
  }

  if (!hexCodeRegex.test(values.primaryColour)) {
    errors.primaryColour = ERROR_MESSAGES.INCORRECT_HEX_PRIMARY
  }

  if (!hexCodeRegex.test(values.secondaryColour)) {
    errors.secondaryColour = ERROR_MESSAGES.INCORRECT_HEX_SECONDARY
  }

  if (!hexCodeRegex.test(values.headerTextColour)) {
    errors.headerTextColour = ERROR_MESSAGES.INCORRECT_HEX_HEADER_TEXT
  }

  if (values.marketingMode.length === 0) {
    errors.marketingMode = ERROR_MESSAGES.MISSING_MARKETING_MODE
  }

  if (Number.isNaN(Number(values.minPrice))) {
    errors.minPrice = ERROR_MESSAGES.INCORRECT_MIN_PRICE
  }

  if (Number.isNaN(Number(values.maxPrice))) {
    errors.maxPrice = ERROR_MESSAGES.INCORRECT_MAX_PRICE
  }

  if (Number.isNaN(Number(values.minRent))) {
    errors.minRent = ERROR_MESSAGES.INCORRECT_MIN_RENT
  }

  if (Number.isNaN(Number(values.maxRent))) {
    errors.maxRent = ERROR_MESSAGES.INCORRECT_MAX_RENT
  }

  if (Number.isNaN(Number(values.propertyLimit))) {
    errors.propertyLimit = ERROR_MESSAGES.INCORRECT_PROPERTY_LIMIT
  }

  if (Number.isNaN(Number(values.interval))) {
    errors.interval = ERROR_MESSAGES.INCORRECT_ROTATION_INTERVAL
  }

  if (values.departments.length === 0) {
    errors.departments = ERROR_MESSAGES.MISSING_DEPARTMENTS
  }

  return errors
}
