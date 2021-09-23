import * as codebuild from '@aws-cdk/aws-codebuild'
import { Project } from '@aws-cdk/aws-codebuild';
import { Topic } from '@aws-cdk/aws-sns';
import { Construct } from '@aws-cdk/core';
import { createSnsTopic } from './create-sns';

export const createCodeBuildProject = (app: Construct): [Project, Topic] => {
  const project = new codebuild.Project(app as any, 'MyProject', {
    buildSpec: codebuild.BuildSpec.fromObject({
      version: '0.2',
      phases: {
        build: {
          commands: [
            'echo "No build specified"',
          ],
        },
      },
    }),
  })

  const topic = createSnsTopic(app)

  return [project, topic]
}
