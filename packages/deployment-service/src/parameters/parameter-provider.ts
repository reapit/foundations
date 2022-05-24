import { Injectable } from '@nestjs/common'
import { SSM } from 'aws-sdk'

@Injectable()
export class ParameterProvider {
  constructor(private readonly ssm: SSM) {}

  async obtainParameters(pipelineId: string): Promise<{ [s: string]: any }> {
    return new Promise<Record<string, any>>((resolve, reject) =>
      this.ssm.getParameter(
        {
          Name: `cloud-${pipelineId}`,
          WithDecryption: true,
        },
        (err, data) => {
          if (err && err.code !== 'ParameterNotFound') reject(err)
          resolve(data && data.Parameter && data.Parameter.Value ? JSON.parse(data.Parameter.Value) : {})
        },
      ),
    )
  }

  async saveParameters(pipelineId: string, params: { [s: string]: any }): Promise<void> {
    return new Promise<void>((resolve, reject) =>
      this.ssm.putParameter(
        {
          Name: `cloud-${pipelineId}`,
          Overwrite: true,
          Type: 'SecureString',
          Value: JSON.stringify(params),
        },
        (err) => {
          if (err) reject()
          resolve()
        },
      ),
    )
  }
}
