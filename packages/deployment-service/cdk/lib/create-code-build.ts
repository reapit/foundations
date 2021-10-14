import * as codebuild from '@aws-cdk/aws-codebuild'
import { Project } from '@aws-cdk/aws-codebuild'
import { Topic } from '@aws-cdk/aws-sns'
import { CdkStack } from './cdk-stack'
import { createSnsTopic } from './create-sns'

export const createCodeBuildProject = (stack: CdkStack): [Project, Topic] => {
  const project = new codebuild.Project(stack as any, 'MyProject', {
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

  return [project, topic]
}
