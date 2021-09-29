import errorMessages from './error-messages'
export const validateSpecialChars =
  (required: boolean, validate?: (value: string) => string | null) =>
  (value: string): string | null => {
    if (!value) return null

    if (/^[\w\-\s£$@%&*()?!%/=+'"~^,.#;:]+$/.test(value) && /^((?!javascript).)*$/.test(value.toLowerCase())) {
      if (required && validate) {
        return validate(value)
      }
      return null
    }
    return errorMessages.SPECIAL_CHARS
  }
