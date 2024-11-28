import { aws_ec2, aws_events, aws_events_targets, aws_iam, aws_lambda, Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'

interface DnsCertificateUpdateOptionsInterface {
  usercodeStack: Stack
  vpc: aws_ec2.Vpc
}

export class DnsCertificateUpdate extends Construct {
  constructor(
    paasEuWest2Stack: Stack,
    id: string,
    { usercodeStack: usercodeEuWest2Stack, vpc }: DnsCertificateUpdateOptionsInterface,
  ) {
    super(paasEuWest2Stack, id)

    const userCodeUsEast1Stack = new Stack(usercodeEuWest2Stack, 'event-bus-us-east-1-usercode-stack', {
      env: { account: usercodeEuWest2Stack.account, region: 'us-east-1' },
    })

    const eventBusUsEast1 = aws_events.EventBus.fromEventBusName(
      userCodeUsEast1Stack,
      `${id}-lookup-default-bus`,
      'default',
    )

    const paasEventBridgeEuWest2 = new aws_events.EventBus(paasEuWest2Stack, `${id}-paas-event-bridge-acm`, {
      eventBusName: 'acm-bus',
    })

    new aws_events.Rule(userCodeUsEast1Stack, `${id}-cross-account-rule`, {
      targets: [new aws_events_targets.EventBus(paasEventBridgeEuWest2)],
      eventBus: eventBusUsEast1,
      eventPattern: {
        source: ['aws.acm'],
      },
    })

    paasEventBridgeEuWest2.addToResourcePolicy(
      new aws_iam.PolicyStatement({
        sid: 'AllowTrustedAccountToPutEvents',
        effect: aws_iam.Effect.ALLOW,
        actions: ['events:PutEvents'],
        resources: [paasEventBridgeEuWest2.eventBusArn],
        principals: [new aws_iam.AccountPrincipal(userCodeUsEast1Stack.account)],
      }),
    )

    const testLambda = new aws_lambda.Function(paasEuWest2Stack, `${id}-eu-test-trigger`, {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: aws_lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Event received:', JSON.stringify(event));
          return { statusCode: 200, body: 'Event processed' };
        };
      `),
    })

    const testRule = new aws_events.Rule(paasEuWest2Stack, `${id}-test-trigger-rule`, {
      targets: [new aws_events_targets.LambdaFunction(testLambda)],
      eventBus: paasEventBridgeEuWest2,
      eventPattern: {
        source: ['aws.acm'],
      },
    })
  }
}
