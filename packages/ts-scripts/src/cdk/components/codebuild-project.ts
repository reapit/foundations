import * as cdk from 'aws-cdk-lib'
import {
  aws_codebuild as codebuild,
  aws_events_targets as targets,
  aws_events as events,
  PhysicalName,
} from 'aws-cdk-lib'
import { LinuxBuildImage } from 'aws-cdk-lib/aws-codebuild'

import { createSnsTopic, Topic } from './sns-topic'

export const createCodeBuildProject = (stack: cdk.Stack, name: string): codebuild.Project => {
  const project = new codebuild.Project(stack, name, {
    environment: {
      buildImage: LinuxBuildImage.AMAZON_LINUX_2_3,
    },
    projectName: PhysicalName.GENERATE_IF_NEEDED,
    buildSpec: codebuild.BuildSpec.fromObject({
      version: '0.2',
      phases: {
        build: {
          commands: ['echo "No build specified"'],
        },
      },
    }),
  })

  return project
}

export const getCodebuildSnsTopic = (stack: cdk.Stack): Topic => {
  const topic = createSnsTopic(stack, 'codebuild-sns-topic')

  const rule = new events.Rule(stack, 'codebuild-sns-topic-rule', {
    eventPattern: {
      source: ['aws.codebuild'],
    },
  })
  rule.addTarget(new targets.SnsTopic(topic))

  return topic
}

export type Project = codebuild.IProject
