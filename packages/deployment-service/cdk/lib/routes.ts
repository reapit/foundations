import { AddRoutesOptions, HttpMethod, IHttpRouteIntegration } from "@aws-cdk/aws-apigatewayv2";
import { HttpUserPoolAuthorizer } from "@aws-cdk/aws-apigatewayv2-authorizers";

const routes: {
  path: string,
  method: HttpMethod[],
}[] = [
  {
    path: '/pipeline',
    method: [HttpMethod.GET],
  },
  {
    path: '/pipeline/{pipelineId}',
    method: [HttpMethod.GET],
  },
  {
    path: '/pipeline/{pipelineId}',
    method: [HttpMethod.PUT],
  },
  {
    path: '/pipeline/{pipelineId}',
    method: [HttpMethod.DELETE],
  },
  {
    path: '/pipeline/{pipelineId}/pipeline-runner',
    method: [HttpMethod.POST],
  },
  {
    path: '/pipeline/{pipelineId}/pipeline-runner',
    method: [HttpMethod.GET],
  },
  {
    path: '/pipeline/{pipelineId}/pipeline-runner/{pipelineRunnerId}',
    method: [HttpMethod.PUT],
  },
  {
    path: '/pipeline/{pipelineId}/pipeline-runner/{pipelineRunnerId}',
    method: [HttpMethod.GET],
  },
  {
    path: '/deploy/release/{project}/{version}',
    method: [HttpMethod.POST],
  },
  {
    path: '/deploy/release/{project}',
    method: [HttpMethod.GET],
  },
  {
    path: '/deploy/version/{project}/{version}',
    method: [HttpMethod.POST],
  },
  {
    path: '/deploy/project',
    method: [HttpMethod.GET],
  },
]

export const generateRoutes = (integration: IHttpRouteIntegration, authorizer: HttpUserPoolAuthorizer): AddRoutesOptions[] => {
  const api: AddRoutesOptions[] = routes.map<AddRoutesOptions>((route) => ({
    ...route,
    integration,
    path: `/api${route.path}`,
  }))
  const http: AddRoutesOptions[] = routes.map<AddRoutesOptions>((route) => ({
    ...route,
    integration,
    authorizer,
  }))

  return [
    ...api,
    ...http,
  ]
}
