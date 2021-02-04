import dayjs from 'dayjs'
import { MutableRefObject } from 'react'
import { fieldValidateRequire } from '../../utils/validators'

export type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown'

export const isAmex = (cardString: string) => {
  return cardString.startsWith('34') || cardString.startsWith('37')
}

export const isVisa = (cardString: string) => {
  return cardString.startsWith('4')
}

export const isMasterCard = (cardString: string) => {
  const firstTwoDigits = Number(cardString.substring(0, 2))
  const firstFourDigits = Number(cardString.substring(0, 4))
  if (firstTwoDigits > 50 && firstTwoDigits < 56) return true
  if (firstFourDigits > 2220 && firstFourDigits < 2721) return true
  return false
}

// See: https://en.wikipedia.org/wiki/Payment_card_number for card identifiers
export const getCardType = (cardString: string): CardType => {
  if (isVisa(cardString)) return 'visa'
  if (isMasterCard(cardString)) return 'mastercard'
  if (isAmex(cardString)) return 'amex'
  return 'unknown'
}

export const formatCardNumber = (cardNumber: string, input: MutableRefObject<null | HTMLInputElement>) => {
  if (!input.current) return ''

  const selectionStart = input.current.selectionStart as number
  const trimmedCardNum = cardNumber.replace(/\s+/g, '')
  const isAmex = getCardType(trimmedCardNum) === 'amex'
  /* Handle American Express 4-6-5 spacing format */
  const partitions = isAmex ? [3, 9] : [3, 7, 11]

  /* Handle caret position if user edits the number later */
  if (selectionStart < cardNumber.length - 1) {
    input.current.setSelectionRange(selectionStart, selectionStart, 'none')
  }

  return trimmedCardNum
    .split('')
    .map((item: string, index: number) => {
      if (partitions.includes(index) && trimmedCardNum.length !== index + 1) {
        return `${item} `
      }

      return item
    })
    .join('')
}

export const unformatCard = (formattedCard: string) => formattedCard.split(' ').join('')

export const formatCardExpires = (cardNumber: string, input: MutableRefObject<null | HTMLInputElement>) => {
  if (!input.current) return ''

  const selectionStart = input.current.selectionStart as number
  const trimmedCardNum = cardNumber.replace(/\s+/g, '').replace(/\//g, '')
  /* Handle caret position if user edits the number later */
  if (selectionStart < cardNumber.length - 1) {
    input.current.setSelectionRange(selectionStart, selectionStart, 'none')
  }

  return trimmedCardNum
    .split('')
    .map((item: string, index: number) => {
      if (index === 1 && trimmedCardNum.length > 2) {
        return `${item} / `
      }

      return item
    })
    .join('')
}

export const unformatCardExpires = (formattedCard: string) =>
  formattedCard
    .split(' ')
    .join('')
    .replace(/\//g, '')

export const validateCard = (value: string, whiteListTestCards: string[]) => {
  const requiredError = fieldValidateRequire(value)
  const cardType = getCardType(value)
  const unformattedCard = unformatCard(value)
  const whiteListTestCard = whiteListTestCards.find(card => card === unformattedCard)
  const cardLength = whiteListTestCard ? whiteListTestCard.length : cardType === 'amex' ? 15 : 16

  if (requiredError) {
    return requiredError
  }

  if (isNaN(Number(unformattedCard))) {
    return 'Card number should be numeric characters only'
  }

  if (cardLength !== unformattedCard.length) {
    return `Card number needs to be ${cardLength} numbers to be valid`
  }

  return null
}

export const validateSecureCode = (value: string, cardType: CardType) => {
  const requiredError = fieldValidateRequire(value)
  const codeLength = cardType === 'amex' ? 4 : 3

  if (requiredError) {
    return requiredError
  }

  if (isNaN(Number(value))) {
    return 'CSV should be numeric characters only'
  }

  if (codeLength !== value.length) {
    return `CSV needs to be ${codeLength} numbers to be valid`
  }

  return null
}

export const validateCardExpires = (value: string) => {
  const now = dayjs()
  const fomattedValue = dayjs(value.replace(/\s+/g, ''), 'MM/YY')
  const requiredError = fieldValidateRequire(value)
  const trimmedCardNum = value.replace(/\s+/g, '').replace(/\//g, '')

  if (requiredError) {
    return requiredError
  }

  if (isNaN(Number(trimmedCardNum))) {
    return 'Dates should be numeric characters only'
  }

  if (fomattedValue.isBefore(now)) {
    return 'Card has expired'
  }

  return null
}

export const handleValidateCard = (whiteListTestCards: string[]) => (value: string) =>
  validateCard(value, whiteListTestCards)

export const handleValidateSecureCode = (cardType: CardType) => (value: string) => validateSecureCode(value, cardType)
