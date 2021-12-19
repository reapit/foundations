import * as codebuild from '@aws-cdk/aws-codebuild'
import { Project } from '@aws-cdk/aws-codebuild'
import { Topic } from '@aws-cdk/aws-sns'
import { CdkStack } from './cdk-stack'
import { createSnsTopic } from './create-sns'
import { Rule } from '@aws-cdk/aws-events'
import * as targets from '@aws-cdk/aws-events-targets'

export const createCodeBuildProject = (stack: CdkStack): [Project, Topic] => {
  const project = new codebuild.Project(stack as any, 'cloud-deployment-service', {
    buildSpec: codebuild.BuildSpec.fromObject({
      version: '0.2',
      phases: {
        build: {
          commands: ['echo "No build specified"'],
        },
      },
    }),
  })

  const topic = createSnsTopic(stack)

  const rule = new Rule(stack, 'cloud-deployment-service-code-build-rule', {
    eventPattern: {
      source: ['aws.codebuild'],
    },
  })

  rule.addTarget(new targets.SnsTopic(topic))

  return [project, topic]
}
