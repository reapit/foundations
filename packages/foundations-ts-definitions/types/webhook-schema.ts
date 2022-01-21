import {
  AppDetailModel,
  ApplicantModel,
  AppointmentModel,
  CompanyModel,
  ContactModel,
  ConveyancingModel,
  DocumentModel,
  EnquiryModel,
  IdentityCheckModel,
} from "types"

export enum ReapitWebhookTopicEnum {
  APPLICATION_INSTALL = "application.install",
  APPLICATION_UNINSTALL = "application.uninstall",
  APPLICANTS_CREATED = "applicants.created",
  APPLICANTS_MODIFIED = "applicants.modified",
  APPOINTMENTS_CANCELLED = "appointments.cancelled",
  APPOINTMENTS_CONFIRMED = "appointments.confirmed",
  APPOINTMENTS_CREATED = "appointments.created",
  APPOINTMENTS_MODIFIED = "appointments.modified",
  COMPANIES_CREATED = "companies.created",
  COMPANIES_MODIFIED = "companies.modified",
  CONTACTS_CREATED = "contacts.created",
  CONTACTS_MODIFIED = "contacts.modified",
  CONTACTS_OPTEDOUT = "contacts.optedout",
  CONVEYANCING_MODIFIED = "conveyancing.modified",
  DOCUMENTS_CREATED = "documents.created",
  DOCUMENTS_MODIFIED = "documents.modified",
  ENQUIRIES_ACCEPTED = "enquiries.accepted",
  ENQUIRIES_CREATED = "enquiries.created",
  ENQUIRIES_MODIFIED = "enquiries.modified",
  ENQUIRIES_REJECTED = "enquiries.rejected",
  IDENTITYCHECKS_CREATED = "identitychecks.created",
  IDENTITYCHECKS_MODIFIED = "identitychecks.modified",
  LANDLORDS_CREATED = "landlords.created",
  LANDLORDS_MODIFIED = "landlords.modified",
  OFFERS_ACCEPTED = "offers.accepted",
  OFFERS_CREATED = "offers.created",
  OFFERS_MODIFIED = "offers.modified",
  OFFERS_REJECTED = "offers.rejected",
  OFFERS_WITHDRAWN = "offers.withdrawn",
  OFFICES_CREATED = "offices.created",
  OFFICES_MODIFIED = "offices.modified",
  PROPERTIES_CREATED = "properties.created",
  PROPERTIES_MODIFIED = "properties.modified",
  PROPERTIES_SELLING_ASKINGPRICECHANGED = "properties.selling.askingpricechanged",
  PROPERTIES_SELLING_COMPLETED = "properties.selling.completed",
  PROPERTIES_SELLING_EXCHANGED = "properties.selling.exchanged",
  PROPERTIES_SELLING_WITHDRAWN = "properties.selling.withdrawn",
  PROPERTIES_SELLING_INSTRUCTED = "properties.selling.instructed",
  PROPERTIES_SELLING_LOSTINSTRUCTION = "properties.selling.lostinstruction",
  PROPERTIES_SELLING_UNDEROFFER = "properties.selling.underoffer",
  TENANCIES_CREATED = "tenancies.created",
  TENANCIES_MODIFIED = "tenancies.modified",
  VENDORS_CREATED = "vendors.created",
  VENDORS_MODIFIED = "vendors.modified",
  WORKSORDERS_CANCELLED = "worksorders.cancelled",
  WORKSORDERS_COMPLETE = "worksorders.complete",
  WORKSORDERS_MODIFIED = "worksorders.modified",
  WORKSORDERS_RAISED = "worksorders.raised",
}

type ReapitWebhookValueType<T> = {
  new: T,
  old: T,
  diff: Partial<T>,
}

type ReapitWebhookPayloadType = {
  eventId: string,
  SendAttempts: number,
  entityId: string,
  customerId: string,
  eventTime: string,
  topicId: ReapitWebhookTopicEnum,
}

// TODO requires ApplicationModal
export type ReapitWebhookApplicationInstallEvent = ReapitWebhookValueType<AppDetailModel> & ReapitWebhookPayloadType & {
  topidId: ReapitWebhookTopicEnum.APPLICATION_INSTALL
}

export type ReapitWebhookApplicationUninstallEvent = ReapitWebhookValueType<AppDetailModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.APPLICATION_UNINSTALL
}

export type ReapitWebhookApplicantsCreatedEvent = ReapitWebhookValueType<ApplicantModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.APPLICANTS_CREATED
}

export type ReapitWebhookApplicantsModifiedEvent = ReapitWebhookValueType<ApplicantModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.APPLICANTS_MODIFIED
}

export type ReapitWebhookAppointmentsCancelledEvent = ReapitWebhookValueType<AppointmentModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.APPOINTMENTS_CANCELLED
}

export type ReapitWebhookAppointmentsConfirmedEvent = ReapitWebhookValueType<AppointmentModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.APPOINTMENTS_CONFIRMED
}

export type ReapitWebhookAppointmentsCreatedEvent = ReapitWebhookValueType<AppointmentModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.APPOINTMENTS_CREATED
}

export type ReapitWebhookAppointmentsModifiedEvent = ReapitWebhookValueType<AppointmentModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.APPOINTMENTS_MODIFIED
}

export type ReapitWebhookCompaniesCreatedEvent = ReapitWebhookValueType<CompanyModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.COMPANIES_CREATED
}

export type ReapitWebhookCompaniesModifiedEvent = ReapitWebhookValueType<CompanyModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.COMPANIES_MODIFIED
}

export type ReapitWebhookContactsCreatedEvent = ReapitWebhookValueType<ContactModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.CONTACTS_CREATED
}

export type ReapitWebhookContactsModifiedEvent = ReapitWebhookValueType<ContactModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.CONTACTS_MODIFIED
}

export type ReapitWebhookContactsOptedOutEvent = ReapitWebhookValueType<ContactModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.CONTACTS_OPTEDOUT
}

export type ReapitWebhookConveyancingModifiedEvent = ReapitWebhookValueType<ConveyancingModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.CONVEYANCING_MODIFIED
}

export type ReapitWebhookDocumentsCreatedEvent = ReapitWebhookValueType<DocumentModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.DOCUMENTS_CREATED
}

export type ReapitWebhookDocumentsModifiedEvent = ReapitWebhookValueType<DocumentModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.DOCUMENTS_MODIFIED
}

export type ReapitWebhookEnquiriesCreatedEvent = ReapitWebhookValueType<EnquiryModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.ENQUIRIES_CREATED
}

export type ReapitWebhookEnquiriesModifiedEvent = ReapitWebhookValueType<EnquiryModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.ENQUIRIES_MODIFIED
}

export type ReapitWebhookEnquiriesAcceptedEvent = ReapitWebhookValueType<EnquiryModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.ENQUIRIES_ACCEPTED
}

export type ReapitWebhookEnquiriesRejectedEvent = ReapitWebhookValueType<EnquiryModel> & ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.ENQUIRIES_REJECTED
}

export type ReapitWebhookIndentityChecksCreatedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.IDENTITYCHECKS_CREATED
}

export type ReapitWebhookIndentityChecksModifiedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.IDENTITYCHECKS_MODIFIED
}

export type ReapitWebhookLandlordsCreatedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.LANDLORDS_CREATED
}

export type ReapitWebhookLandlordsModifiedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.LANDLORDS_MODIFIED
}

export type ReapitWebhookOffersAcceptedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.OFFERS_ACCEPTED
}

export type ReapitWebhookOffersCreatedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.OFFERS_CREATED
}

export type ReapitWebhookOffersRejectedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.OFFERS_REJECTED
}

export type ReapitWebhookOffersModifiedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.OFFERS_MODIFIED
}

export type ReapitWebhookOffersWithdrawnEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.OFFERS_WITHDRAWN
}

export type ReapitWebhookOfficesCreatedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.OFFICES_CREATED
}

export type ReapitWebhookOfficesModifiedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.OFFICES_MODIFIED
}

export type ReapitWebhookPropertiesCreatedEvent = ReapitWebhookValueType<IdentityCheckModel> 
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.PROPERTIES_CREATED
}

export type ReapitWebhookPropertiesModifiedEvent = ReapitWebhookValueType<IdentityCheckModel> 
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.PROPERTIES_MODIFIED
}

export type ReapitWebhookPropertiesSellingAskingPriceChangedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.PROPERTIES_SELLING_ASKINGPRICECHANGED
}

export type ReapitWebhookPropertiesSellingCompleteEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.PROPERTIES_SELLING_COMPLETED
}

export type ReapitWebhookPropertiesSellingExchangedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.PROPERTIES_SELLING_EXCHANGED
}


export type ReapitWebhookPropertiesSellingInstructedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.PROPERTIES_SELLING_INSTRUCTED
}

export type ReapitWebhookPropertiesSellingLostInstructionEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.PROPERTIES_SELLING_LOSTINSTRUCTION
}

export type ReapitWebhookPropertiesSellingUnderOfferEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.PROPERTIES_SELLING_UNDEROFFER
}

export type ReapitWebhookPropertiesSellingWithdrawnEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.PROPERTIES_SELLING_WITHDRAWN
}

export type ReapitWebhookTenanciesCreatedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.TENANCIES_CREATED
}

export type ReapitWebhookTenanciesModifiedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.TENANCIES_MODIFIED
}

export type ReapitWebhookVendorsCreatedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.VENDORS_CREATED
}

export type ReapitWebhookVendorsModifiedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.VENDORS_MODIFIED
}

export type ReapitWebhookWorksOrdersCancelledEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.WORKSORDERS_CANCELLED
}

export type ReapitWebhookWorksOrdersCompleteEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.WORKSORDERS_COMPLETE
}

export type ReapitWebhookWorksOrdersModifiedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.WORKSORDERS_MODIFIED
}

export type ReapitWebhookWorksOrdersRaisedEvent = ReapitWebhookValueType<IdentityCheckModel>
& ReapitWebhookPayloadType & {
  topicId: ReapitWebhookTopicEnum.WORKSORDERS_RAISED
}
