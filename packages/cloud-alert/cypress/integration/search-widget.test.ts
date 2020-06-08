Cypress.on('fail', (error, runnable) => {
  fetch(Cypress.env('SLACK_WEB_HOOK_URL'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: `Failed on ${runnable.title}`,
    }),
  })
  throw error
})

if (Cypress.env('PACKAGE_NAME') === 'all' || Cypress.env('PACKAGE_NAME') === 'search-widget') {
  const WEB_COMPONENTS_API_URL = Cypress.env(`WEB_COMPONENTS_API_URL_${Cypress.env('ENVIRONMENT')}`)
  describe('search-widget API', () => {
    let property = {}
    let properties = [] as any
    let propertyImages = [] as any

    beforeEach(function() {
      cy.fixture('search-widget/property.json').then(data => {
        property = data
      })
      cy.fixture('search-widget/properties.json').then(data => {
        properties = data
      })
      cy.fixture('search-widget/property-images.json').then(data => {
        propertyImages = data
      })
    })
    it('user should able to call /properties/<id>', () => {
      cy.request({
        url: `${WEB_COMPONENTS_API_URL}/properties/BED150319`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Cypress.env('WEB_COMPONENTS_X_API_KEY'),
        },
      }).as('property')
      cy.get('@property').should((response: any) => {
        expect(response).to.have.property('headers')
        expect(response).to.have.property('body')
        expect(response).to.have.property('status')
        expect(response.status).to.equal(200)
        expect(response.body).not.to.be.undefined
        expect(response.body).to.deep.equal(property)
      })
    })
    it('user should able to call /properties?<query params>', () => {
      cy.request({
        // eslint-disable-next-line max-len
        url: `${WEB_COMPONENTS_API_URL}/properties?keywords=london&isRental=true&apiKey&customerId=DXX&pageNumber=1&bedroomsFrom=1&bedroomsTo=2&priceFrom=300000&priceTo=500000&sortBy=price&propertyType=house&addedIn`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Cypress.env('WEB_COMPONENTS_X_API_KEY'),
        },
      }).as('properties')
      cy.get('@properties').should((response: any) => {
        expect(response).to.have.property('headers')
        expect(response).to.have.property('body')
        expect(response).to.have.property('status')
        expect(response.status).to.equal(200)
        expect(response.body._embedded).to.have.length(25)
        expect(response.body._embedded).to.deep.equal(properties._embedded)
      })
    })

    it('user should able to call /propertyImages', () => {
      cy.request({
        url: `${WEB_COMPONENTS_API_URL}/propertyImages`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Cypress.env('WEB_COMPONENTS_X_API_KEY'),
        },
      }).as('propertyImages')
      cy.get('@propertyImages').should((response: any) => {
        expect(response).to.have.property('headers')
        expect(response).to.have.property('body')
        expect(response).to.have.property('status')
        expect(response.status).to.equal(200)
        expect(response.body._embedded).to.have.length(25)
        expect(response.body._embedded).to.deep.equal(propertyImages._embedded)
      })
    })
  })
}
