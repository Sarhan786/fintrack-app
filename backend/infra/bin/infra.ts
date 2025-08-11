#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();
new InfraStack(app, 'FintrackInfraStack', {
  // This stack is environment-agnostic, meaning it can be deployed to any AWS account/region.
  // For more information on environments, see: https://docs.aws.amazon.com/cdk/latest/guide/environments.html
});