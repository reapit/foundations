import * as codebuild from '@aws-cdk/aws-codebuild'
import { Construct } from '@aws-cdk/core';

export const createCodeBuildProject = (app: Construct) => {
  return new codebuild.Project(app as any, 'MyProject', {
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
  });
}
