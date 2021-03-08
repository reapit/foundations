# GraphQL Server

![lines](./src/tests/badges/badge-lines.svg) ![functions](./src/tests/badges/badge-functions.svg) ![branches](./src/tests/badges/badge-branches.svg) ![statements](./src/tests/badges/badge-statements.svg)

A GraphQL implementation of the Foundations API. The GraphQL service is a proxy service that sits on top of the Reapit Foundations Platform API. The service exists as a convenience for developers to build web applications quickly and with minimal boilerplate.

**The service under active development - if you are interested in becoming an Alpha tester, please contact Will McVay wmcvay@reapit.com**

## Basic Usage

The GraphQL production service is deployed to `https://graphql.reapit.cloud/graphql`

Loading this Url in your browser will do a get to the service and load the GraphQL playground https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/ where you can experiment with the service, like Swagger but for GraphQL. 

There are two required headers in the service as per below, you will need to obtain your access and id tokens from your Reapit Connect session as normal. These headers need to be added to the http headers section of the playground for you to interact with the service. 

Naturally, the scopes in the access token provided in the reapit-connect-token header will need to be sufficient to map to the platform endpoints downstream from GraphQL.

```json
{
  "authorization": "id-token-from-reapit-connect",
  "reapit-connect-token": "access-token-from-reapit-connect"
}

```

Internally we use Apollo Client to query the Apollo Server backend (this service). An example of how we set this up and add a query provider to a Reapit Scaffolded app can be found here and here.

## Errors

Because the service is a platform proxy, it is very likely that 4xx errors are downstream platform issues rather than errors thrown by the service itself. The exception to this rule are 401 errors which are thrown by our API gateway owing to an invalid or missing idToken. See previous point regarding headers.

For downstream errors, the service will return a 200 with an errors object in the payload. You should inspect this errors list for details of any failures downstream, even if the GraphQL service itself was able to respond correctly.

## Known Limitations During Alpha

- The service is already working in production with live customers, powering the Reapit Geo Diary app however, naturally with Alpha software there will likely be some bugs. If you find an issue you believe to be problem with the GraphQL service, please open an issue here https://github.com/reapit/foundations/issues/new?assignees=&labels=bug%2C+needs-triage%2C+graphql-server&template=bug_report.md&title= and we will look at it as soon as possible.
- The objective of the project is to offer the an identical schema to the Foundations API, with no extension, modification or deviation. Objects returned from the service should map 1:1 to those seen in the developer portal swagger document https://developers.reapit.cloud/swagger. That said, there may be some lag between when a property is updated in the main platform. If you find any inconsistencies between the platform API and the service, again please report as an issue - it is likely that the platform has updated and the service is yet to follow. We will be conducting a review of all services before releasing to Beta production to esure full schema compliance.
- The service is lacking two services that exist in the Platform Schema - Meta Data and Meta Data Schema. If there is a requirement to add these services in the near term, please comment on this issue and we will look at prioritising https://github.com/reapit/foundations/issues/3631