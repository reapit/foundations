/* eslint-disable */

export const telephoneRegex = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g
export const letterNumberSpaceRegex = /^[a-zA-Z0-9|\s]+$/
export const httpsUrlRegex = /^\s*(https:\/\/)([a-z\d-]{1,63}\.)*[a-z\d-]{1,255}\.[a-z]{2,6}\s*/
