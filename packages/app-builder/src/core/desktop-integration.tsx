import { ParsedArg } from '@/components/hooks/use-introspection/query-generators'
import { AppWithPages } from '../components/hooks/apps/fragments'
import { notEmpty } from '../components/hooks/use-introspection/helpers'
import { IntrospectionResult } from '../components/hooks/use-introspection/parse-introspection'

enum IntegrationType {
  IdCheck = 'IdCheck',
  PrpMarketing = 'PrpMarketing',
  VendorMarketing = 'VendorMarketing',
  PrintWizard = 'PrintWizard',
  AppExport = 'AppExport',
  Property = 'Property',
  Applicant = 'Applicant',
  Landlord = 'Landlord',
  Company = 'Company',
  Contact = 'Contact',
  Tenancy = 'Tenancy',
  Offer = 'Offer',
  ChainManagement = 'ChainManagement',
  SalesProgression = 'SalesProgression',
  Payment = 'Payment',
  OutboundLandline = 'OutboundLandline',
  OutboundMobile = 'OutboundMobile',
  OutboundEmail = 'OutboundEmail',
}

export enum DesktopContext {
  prpCode = 'prpCode',
  appCode = 'appCode',
  lldCode = 'lldCode',
  cntCode = 'cntCode',
  cmpCode = 'cmpCode',
  tenCode = 'tenCode',
  offerCode = 'offerCode',
}

const ProvidedContext = {
  [IntegrationType.Property]: DesktopContext.prpCode,
  [IntegrationType.Applicant]: DesktopContext.appCode,
  [IntegrationType.Landlord]: DesktopContext.lldCode,
  [IntegrationType.IdCheck]: DesktopContext.cntCode,
  [IntegrationType.PrpMarketing]: DesktopContext.prpCode,
  [IntegrationType.VendorMarketing]: DesktopContext.prpCode,
  [IntegrationType.PrintWizard]: DesktopContext.prpCode,
  [IntegrationType.Company]: DesktopContext.cmpCode,
  [IntegrationType.Contact]: DesktopContext.cntCode,
  [IntegrationType.Tenancy]: DesktopContext.tenCode,
  [IntegrationType.Offer]: DesktopContext.offerCode,
  [IntegrationType.SalesProgression]: DesktopContext.prpCode,
  [IntegrationType.ChainManagement]: DesktopContext.prpCode,
}

type MarketplaceGlobals = Record<DesktopContext, string | undefined>

const DESKTOP_CONTEXT_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'

export const getDesktopContext = (app: AppWithPages, availableObjects: IntrospectionResult[]) => {
  const rptGlobals = window[DESKTOP_CONTEXT_KEY]

  const globals = (rptGlobals ? { ...rptGlobals } : undefined) as MarketplaceGlobals | undefined
  if (!globals) {
    return {}
  }
  const availableIntegrations = getAvailableIntegrations(globals)
  const landingPage = getLandingPage(app, availableIntegrations, availableObjects, globals)

  return {
    globals,
    landingPage,
  }
}

export const unsetDesktopContext = () => {
  delete window[DESKTOP_CONTEXT_KEY]
}

// uppercase first letter of string
const uppercaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// get available integration types given args type
export const getAvailableIntegrationsForArgs = (
  args: ParsedArg[],
  allTypes: IntrospectionResult[],
): IntegrationType[] => {
  if (args.length !== 1) {
    return []
  }
  const [arg] = args
  const idOfType = allTypes.find(({ object: { name } }) => name === arg.idOfType)
  const acKey = idOfType?.acKeyField?.acKey

  return Object.entries(ProvidedContext)
    .map(([key, value]) => {
      if (value === acKey) {
        return key as IntegrationType
      }
    })
    .filter(notEmpty)
}

// get landing page given provided context
const getLandingPage = (
  app: AppWithPages,
  availableIntegrations: IntegrationType[],
  availableObjects: IntrospectionResult[],
  globals: MarketplaceGlobals,
) => {
  const possibleLandingPages = app.pages.filter((page) => {
    const landingNode = page.nodes.filter((node) => {
      const integrationLandingType: IntegrationType = node.props.integrationLandingType
      return availableIntegrations.includes(integrationLandingType)
    })
    return landingNode.length > 0
  })

  const object = availableObjects.find(({ acKeyField }) => {
    return acKeyField && availableIntegrations.includes(acKeyField.acKey as IntegrationType)
  })

  if (!object) {
    throw new Error('No object found')
  }

  const contextKey = [object.object.name, uppercaseFirstLetter(object.acKeyField?.name || '')].join('')

  return {
    pageId: possibleLandingPages[0].id,
    context: {
      [contextKey]: globals[object.acKeyField?.acKey as DesktopContext],
    },
  }
}

const getAvailableIntegrations = (globals: MarketplaceGlobals) => {
  const integrationTypes: IntegrationType[] = Object.keys(IntegrationType)
    .map((key) => IntegrationType[key])
    .filter((type) => ProvidedContext[type] && globals[ProvidedContext[type]])
  return integrationTypes
}
