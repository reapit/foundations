import { Test } from '@nestjs/testing'
import { DnsController } from './dns.controller'
import { DnsProvider } from './dns.provider'
import { PipelineProvider } from '../pipeline'
import { OwnershipProvider } from '@reapit/utils-nest'
import { CertificateProvider } from './certificate.provider'
import { DnsCloudFrontProvider } from './dns.cloudfront.provider'
import { PipelineEntity } from '../entities/pipeline.entity'
import { LoginIdentity } from '@reapit/connect-session-server'
import { UnprocessableEntityException } from '@nestjs/common'

const mockDeveloperId = 'developer-id'

const mockPipeline: Partial<PipelineEntity> = {
  developerId: mockDeveloperId,
}

const mockCredentials: LoginIdentity = {
  developerId: mockDeveloperId,
  email: 'test@reapit.com',
  clientId: 'TST',
  adminId: '',
  name: 'test',
  userCode: 'TST',
  orgId: '',
  orgName: '',
  agencyCloudId: 'agency-cloud-id',
  groups: [],
  offGroupIds: '',
  offGrouping: false,
  officeId: 'office-id',
  orgProduct: '',
  offGroupName: '',
}

const mockPipelineProvider = {
  findById: jest.fn((id) =>
    Promise.resolve({
      ...mockPipeline,
      id,
    }),
  ),
  update: jest.fn((pipeline) => Promise.resolve(pipeline)),
  findByDomain: jest.fn(() => Promise.resolve(null)),
}

const mockDnsProvider = {
  verifyTextRecordOnDomain: jest.fn(),
}

const mockCertificateProvider = {
  createCertificate: jest.fn(),
  obtainCertificate: jest.fn(() =>
    Promise.resolve({
      CertificateArn: 'certificate-arn',
    }),
  ),
}

const mockCloudFrontProvider = {
  getCloudFrontDistro: jest.fn(),
}

describe('DnsController', () => {
  let controller: DnsController

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [DnsController],
      providers: [DnsProvider, PipelineProvider, OwnershipProvider, CertificateProvider, DnsCloudFrontProvider],
    })
      .overrideProvider(PipelineProvider)
      .useValue(mockPipelineProvider)
      .overrideProvider(CertificateProvider)
      .useValue(mockCertificateProvider)
      .overrideProvider(DnsCloudFrontProvider)
      .useValue(mockCloudFrontProvider)
      .overrideProvider(DnsProvider)
      .useValue(mockDnsProvider)
      .compile()

    controller = module.get<DnsController>(DnsController)
  })

  it('create dns record', async () => {
    const result = await controller.createDnsRecord('id', { customDomain: 'my.domain.com' }, mockCredentials)

    expect(result.verifyDnsValue).toBeTruthy()
  })

  describe('Verify Dns Record', () => {
    beforeEach(() => {
      mockPipelineProvider.update.mockReset()
      mockCertificateProvider.createCertificate.mockReset()
    })

    it('Successful verify', async () => {
      mockDnsProvider.verifyTextRecordOnDomain.mockImplementationOnce(() =>
        Promise.resolve({
          result: true,
        }),
      )

      const result = await controller.verifyRecord('id', mockCredentials)

      expect(mockPipelineProvider.update).toHaveBeenCalledTimes(1)
      expect(result.result).toBe('success')
      expect(mockCertificateProvider.createCertificate).toHaveBeenCalled()
    })

    it('Failed verify', async () => {
      const failedReason = 'failed reason here'
      mockDnsProvider.verifyTextRecordOnDomain.mockImplementationOnce(() =>
        Promise.resolve({
          result: false,
          reason: failedReason,
        }),
      )

      const result = await controller.verifyRecord('id', mockCredentials)

      expect(result.result).toBe('failed')
      expect(result.reason).toBe(failedReason)
      expect(mockPipelineProvider.update).not.toHaveBeenCalled()
      expect(mockCertificateProvider.createCertificate).not.toHaveBeenCalled()
    })
  })

  describe('Describe Certificate', () => {
    it('Will throw when domain not verified', async () => {
      mockPipelineProvider.findById.mockImplementationOnce((id) =>
        Promise.resolve({
          ...mockPipeline,
          id,
          domainVerified: false,
        }),
      )

      expect.assertions(1)

      try {
        await controller.describeCertificate('id', mockCredentials)
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException)
      }
    })

    it('Will fetch certificate when domain verified', async () => {
      mockPipelineProvider.findById.mockImplementationOnce((id) =>
        Promise.resolve({
          ...mockPipeline,
          id,
          domainVerified: true,
        }),
      )

      const result = await controller.describeCertificate('id', mockCredentials)

      expect(mockCertificateProvider.obtainCertificate).toHaveBeenCalled()
      expect(result.CertificateArn).toBe('certificate-arn')
    })
  })

  describe('Get cloudfront distro', () => {
    it('Will fetch distro when cerificate status is complete', async () => {
      mockPipelineProvider.findById.mockImplementationOnce((id) =>
        Promise.resolve({
          ...mockPipeline,
          id,
          domainVerified: true,
          certificateStatus: 'complete',
        }),
      )

      await controller.getCloudFrontCname('id', mockCredentials)

      expect(mockCloudFrontProvider.getCloudFrontDistro).toHaveBeenCalled()
    })

    it('Will throw if domain not verified', async () => {
      mockPipelineProvider.findById.mockImplementationOnce((id) =>
        Promise.resolve({
          ...mockPipeline,
          id,
          domainVerified: false,
          // certificateStatus: 'complete',
        }),
      )

      expect.assertions(1)

      try {
        await controller.getCloudFrontCname('id', mockCredentials)
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException)
      }
    })

    it('Will throw if certificate not complete', async () => {
      mockPipelineProvider.findById.mockImplementationOnce((id) =>
        Promise.resolve({
          ...mockPipeline,
          id,
          domainVerified: true,
          certificateStatus: 'not-complete',
        }),
      )

      expect.assertions(1)

      try {
        await controller.getCloudFrontCname('id', mockCredentials)
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException)
      }
    })
  })
})
