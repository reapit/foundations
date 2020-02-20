import { CreateNegotiatorModel } from '@reapit/foundations-ts-definitions'

export const createArgStub: CreateNegotiatorModel = {
  name: 'Abel Robertson',
  jobTitle: null,
  active: true,
  officeId: 'NPG',
  workPhone: null,
  mobilePhone: null,
  email: 'abel.robertson@reapitestates.net',
  metadata: {},
<<<<<<< HEAD
=======
  _eTag: '"10109C0209C684789B72FFC53730E31C"',
  _links: {
    self: {
      href: '/negotiators/MGL',
    },
    office: {
      href: '/offices/NPG',
    },
  },
  _embedded: null,
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
}
