import { ContactAddressModel } from '@reapit/foundations-ts-definitions'

export const combineAdress = (address: ContactAddressModel | undefined): string => {
  let addressCombined = ''
  if (!address) {
    return addressCombined
  }
  if (address.buildingNumber) {
    addressCombined = addressCombined.concat(`${address.buildingNumber}`)
  }
  if (address.buildingName) {
    addressCombined = addressCombined.concat(` ${address.buildingName}`)
  }
  if (address.line1) {
    addressCombined = addressCombined.concat(` ${address.line1}`)
  }
  if (address.line2) {
    addressCombined = addressCombined.concat(` ${address.line2}`)
  }
  if (address.line3) {
    addressCombined = addressCombined.concat(` ${address.line3}`)
  }
  if (address.line4) {
    addressCombined = addressCombined.concat(` ${address.line4}`)
  }
  if (address.postcode) {
    addressCombined = addressCombined.concat(` ${address.postcode}`)
  }
  return addressCombined
}
