import * as codebuild from '@aws-cdk/aws-codebuild'
import * as cdk from '@aws-cdk/core'
import * as targets from '@aws-cdk/aws-events-targets'
import { Rule } from '@aws-cdk/aws-events'

import { createSnsTopic, Topic } from './sns-topic'

export const createCodeBuildProject = (stack: cdk.Stack, name: string): codebuild.Project => {
  const project = new codebuild.Project(stack, name, {
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

  const rule = new Rule(stack, 'ccodebuild-sns-topic-rule', {
    eventPattern: {
      source: ['aws.codebuild'],
    },
  })
  rule.addTarget(new targets.SnsTopic(topic))

  return topic
}

export type Project = codebuild.IProject
