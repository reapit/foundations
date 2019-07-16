import { AWSError } from 'aws-sdk';

const errorHandler = (err: AWSError, data: any) => {
  if (err) {
    console.log('ERROR', err);
  } else {
    console.log('SUCCESS', data);
  }
};

export default errorHandler