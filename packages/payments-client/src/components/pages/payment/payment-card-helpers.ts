import dayjs from 'dayjs'

export type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown'
export const whiteListTestCards = ['4929000000006']

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

export const formatCardNumber = (cardNumber: string) => {
  const trimmedCardNum = cardNumber.replace(/\s+/g, '')
  const isAmex = getCardType(trimmedCardNum) === 'amex'
  /* Handle American Express 4-6-5 spacing format */
  const partitions = isAmex ? [3, 9] : [3, 7, 11]

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

export const formatCardExpires = (cardNumber: string) => {
  const trimmedCardNum = cardNumber.replace(/\s+/g, '').replace(/\//g, '')
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

export const unformatCardExpires = (formattedCard: string) => formattedCard.split(' ').join('').replace(/\//g, '')

export const validateCard = (value: string) => {
  const cardType = getCardType(value)
  const unformattedCard = unformatCard(value)
  const whiteListTestCard = whiteListTestCards.find((card) => card === unformattedCard)
  const cardLength = whiteListTestCard ? whiteListTestCard.length : cardType === 'amex' ? 15 : 16

  if (isNaN(Number(unformattedCard)) || cardLength !== unformattedCard.length) {
    return false
  }

  return true
}

export const validateSecureCode = (value: string, cardType: CardType) => {
  const codeLength = cardType === 'amex' ? 4 : 3

  if (isNaN(Number(value)) || codeLength !== value.length) {
    return false
  }

  return true
}

export const validateCardExpires = (value: string) => {
  const now = dayjs()
  const formattedValue = value.replace(/\s+/g, '').split('/').reverse()
  formattedValue[0] = `20${formattedValue[0]}`
  const cardDate = dayjs(formattedValue.join('-'))
  const trimmedCardNum = value.replace(/\s+/g, '').replace(/\//g, '')

  if (isNaN(Number(trimmedCardNum)) || cardDate.isBefore(now)) {
    return false
  }

  return true
}
