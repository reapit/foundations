import { AddRoutesOptions, HttpMethod, IHttpRouteIntegration } from "@aws-cdk/aws-apigatewayv2";
import { HttpUserPoolAuthorizer } from "@aws-cdk/aws-apigatewayv2-authorizers";

const routes: {
  path: string,
  methods: HttpMethod[],
}[] = [
  {
    path: '/pipeline',
    methods: [HttpMethod.GET],
  },
  {
    path: '/pipeline/{pipelineId}',
    methods: [HttpMethod.GET],
  },
  {
    path: '/pipeline/{pipelineId}',
    methods: [HttpMethod.PUT],
  },
  {
    path: '/pipeline/{pipelineId}',
    methods: [HttpMethod.DELETE],
  },
  {
    path: '/pipeline/{pipelineId}/pipeline-runner',
    methods: [HttpMethod.POST],
  },
  {
    path: '/pipeline/{pipelineId}/pipeline-runner',
    methods: [HttpMethod.GET],
  },
  {
    path: '/pipeline/{pipelineId}/pipeline-runner/{pipelineRunnerId}',
    methods: [HttpMethod.PUT],
  },
  {
    path: '/pipeline/{pipelineId}/pipeline-runner/{pipelineRunnerId}',
    methods: [HttpMethod.GET],
  },
  {
    path: '/deploy/release/{project}/{version}',
    methods: [HttpMethod.POST],
  },
  {
    path: '/deploy/release/{project}',
    methods: [HttpMethod.GET],
  },
  {
    path: '/deploy/version/{project}/{version}',
    methods: [HttpMethod.POST],
  },
  {
    path: '/deploy/project',
    methods: [HttpMethod.GET],
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
