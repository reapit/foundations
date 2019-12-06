import { ContactAddressModel } from '@/types/platform'

export const combineAdress = (addresses: ContactAddressModel[] | undefined): string => {
  let addressCombined = ''
  if (!addresses || (addresses && addresses.length === 0)) {
    return addressCombined
  }
  const address = addresses[0]
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
