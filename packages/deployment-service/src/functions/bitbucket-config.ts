import { httpHandler } from '@homeservenow/serverless-aws-handler'

export const bitbucketConfig = httpHandler({
  handler: async () => {
    return {
      key: 'reapit',
      name: 'Reapit App',
      description: "Reapit's BitBucket app for running pipelines",
      vendor: {
        name: 'Reapit Foundations',
        url: 'https://www.reapit.com/foundations/',
      },
      baseUrl: 'https://deployments.dev.paas.reapit.cloud/api/bitbucket',
      authentication: {
        type: 'jwt',
      },
      lifecycle: {
        installed: '/installed',
        uninstalled: '/uninstalled',
      },
      modules: {
        webhooks: [
          {
            event: '*',
            url: '/',
          },
        ],
        // "webItems": [
        //     {
        //         "url": "?repoPath={repository.full_name}",
        //         "name": {
        //             "value": "Example Web Item"
        //         },
        //         "location": "org.bitbucket.repository.navigation",
        //         "key": "example-web-item",
        //         "params": {
        //             "auiIcon": "aui-iconfont-link"
        //         }
        //     }
        // ],
        // "repoPages": [
        //     {
        //         "url": "/?repoPath={repository.full_name}",
        //         "name": {
        //             "value": "Example Page"
        //         },
        //         "location": "org.bitbucket.repository.navigation",
        //         "key": "example-repo-page",
        //         "params": {
        //             "auiIcon": "aui-iconfont-doc"
        //         }
        //     }
        // ],
        // "webPanels": [
        //     {
        //         "url": "/?repoPath={repository.full_name}",
        //         "name": {
        //             "value": "Example Web Panel"
        //         },
        //         "location": "org.bitbucket.repository.overview.informationPanel",
        //         "key": "example-web-panel"
        //     }
        // ]
      },
      scopes: ['account', 'repository'],
      contexts: ['account'],
    }
  },
})
