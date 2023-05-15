import { Duration } from 'aws-cdk-lib'
import { Distribution } from 'aws-cdk-lib/aws-cloudfront'
import { Rule, RuleTargetInput } from 'aws-cdk-lib/aws-events'
import { SfnStateMachine } from 'aws-cdk-lib/aws-events-targets'
import { JsonPath, StateMachine } from 'aws-cdk-lib/aws-stepfunctions'
import { CallAwsService } from 'aws-cdk-lib/aws-stepfunctions-tasks'
import { Construct } from 'constructs'

export class InvalidateCloudfrontDistribution extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { distribution, items = ['/index.html'] }: { distribution: Distribution; items?: string[] },
  ) {
    super(scope, id)

    const createInvalidation = new CallAwsService(this, 'CreateInvalidation', {
      service: 'cloudfront',
      action: 'createInvalidation',
      parameters: {
        DistributionId: distribution.distributionId,
        InvalidationBatch: {
          CallerReference: JsonPath.entirePayload,
          Paths: {
            Items: items,
            Quantity: items.length, // TODO: what does Quantity do?
          },
        },
      },
      iamResources: [`arn:aws:cloudfront::${distribution.stack.account}:distribution/${distribution.distributionId}`],
    })

    const createInvalidationStateMachine = new StateMachine(this, 'CreateInvalidationStateMachine', {
      definition: createInvalidation.addRetry({
        errors: ['CloudFront.CloudFrontException'],
        backoffRate: 2,
        interval: Duration.seconds(5),
        maxAttempts: 10,
      }),
    })

    new Rule(this, 'DeploymentComplete', {
      eventPattern: {
        source: ['aws.cloudformation'],
        detail: {
          'stack-id': [`${distribution.stack.stackId}`],
          'status-details': {
            status: ['UPDATE_COMPLETE'],
          },
        },
      },
    }).addTarget(
      new SfnStateMachine(createInvalidationStateMachine, {
        input: RuleTargetInput.fromEventPath('$.id'),
      }),
    )
  }
}
