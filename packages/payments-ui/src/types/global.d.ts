export type OpayoKeys = {
  integrationKey: string
  passKey: string
  vendorName: string
}

declare module '*.html'

declare global {
  interface Window {
    sagepayOwnForm: ({ merchantSessionKey: string }) => {
      tokeniseCardDetails: (params: any) => void
    }
    SagePayConfig: {
      restHost?: string
    }
  }
}
