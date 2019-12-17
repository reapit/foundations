export type Documents = {
  typeId: string
  expiry: string
  details: string
  fileUrl: string
}

export type MetaData = {
  [key: string]: string
}

export type CreateContactIdentityCheckArgs = {
  contactId: string
  checkDate?: string
  status?: string
  negotiatorId?: string
  documents: Documents[]
  metadata: MetaData
}
