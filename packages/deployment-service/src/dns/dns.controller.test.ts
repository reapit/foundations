import { Test } from '@nestjs/testing'
import { DnsController } from './dns.controller'
import { PipelineProvider } from '../pipeline'
import { OwnershipProvider } from '@reapit/utils-nest'
import { CertificateProvider } from './certificate.provider'
import { DnsCloudFrontProvider } from './dns.cloudfront.provider'
import { PipelineEntity } from '../entities/pipeline.entity'
import { LoginIdentity } from '@reapit/connect-session-server'
import { ForbiddenException, NotFoundException, UnprocessableEntityException } from '@nestjs/common'

const mockDeveloperId = 'developer-id'

const mockCustomDomain = 'custom.domain.co.uk'
const mockCloudfrontDistroDomain = 'id.cloudfront.com'
const mockCertificateArn = 'mock-certificate-arn'

const mockPipeline: Partial<PipelineEntity> = {
  developerId: mockDeveloperId,
  customDomain: mockCustomDomain,
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
}

const mockCertificateProvider = {
  createCertificate: jest.fn(),
  obtainCertificate: jest.fn(() =>
    Promise.resolve({
      CertificateArn: mockCertificateArn,
    }),
  ),
}

const mockCloudFrontProvider = {
  getCloudFrontDistroDomain: jest.fn(() => Promise.resolve(mockCloudfrontDistroDomain)),
}

const mockBody = {
  customDomain: mockCustomDomain,
}

describe('DnsController', () => {
  let controller: DnsController

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [DnsController],
      providers: [PipelineProvider, OwnershipProvider, CertificateProvider, DnsCloudFrontProvider],
    })
      .overrideProvider(PipelineProvider)
      .useValue(mockPipelineProvider)
      .overrideProvider(CertificateProvider)
      .useValue(mockCertificateProvider)
      .overrideProvider(DnsCloudFrontProvider)
      .useValue(mockCloudFrontProvider)
      .compile()

    controller = module.get<DnsController>(DnsController)
  })

  describe('GET /dns/:pipeline createDnsRecord', () => {
    it('Will return domain and certificateArn', async () => {
      mockPipelineProvider.findById.mockImplementationOnce((id) =>
        Promise.resolve({
          id,
          ...mockPipeline,
          cloudFrontId: 'some-cloudfront-id',
        }),
      )
      const result = await controller.getDnsRecordInfo('pipelineId', {
        ...mockCredentials,
        groups: ['FoundationsDeveloperAdmin'],
      })

      expect(result.customDomain).toBe(mockCustomDomain)
      expect(result.cloudfrontUrl).toBe(mockCloudfrontDistroDomain)
      expect(result.certificate).toStrictEqual(
        expect.objectContaining({
          CertificateArn: mockCertificateArn,
        }),
      )
    })

    it('Will return 404 if pipeline has no cloudfrontId', async () => {
      expect(
        async () =>
          await controller.getDnsRecordInfo('pipelineId', {
            ...mockCredentials,
            groups: ['FoundationsDeveloperAdmin'],
          }),
      ).rejects.toThrow(NotFoundException)
    })

    it('Will return 404 if no certificate exists', async () => {
      mockCertificateProvider.obtainCertificate.mockImplementationOnce(() => Promise.resolve(undefined) as any)
      mockPipelineProvider.findById.mockImplementationOnce((id) =>
        Promise.resolve({
          id,
          ...mockPipeline,
          cloudFrontId: 'some-cloudfront-id',
        }),
      )

      expect(
        async () =>
          await controller.getDnsRecordInfo('pipelineId', {
            ...mockCredentials,
            groups: ['FoundationsDeveloperAdmin'],
          }),
      ).rejects.toThrow(NotFoundException)
    })

    it('Will return 403 if credentals is not FoundationsDeveloperAdmin', async () => {
      expect(async () => await controller.getDnsRecordInfo('pipelineId', mockCredentials)).rejects.toThrow(
        ForbiddenException,
      )
    })

    it("Will return 403 if credentials developerId doesn't match pipeline developerId", async () => {
      expect(
        async () =>
          await controller.getDnsRecordInfo('pipelineId', {
            ...mockCredentials,
            groups: ['FoundationsDeveloperAdmin'],
            developerId: 'not-the-same-developer-id',
          }),
      ).rejects.toThrow(ForbiddenException)
    })
  })

  describe('POST /dns/:pipelineId createDnsRecord', () => {
    it('Will return 403 if credentals is not FoundationsDeveloperAdmin', async () => {
      expect(async () => await controller.createDnsRecord('pipelineId', mockBody, mockCredentials)).rejects.toThrow(
        ForbiddenException,
      )
    })

    it("Will return 403 if credentials developerId doesn't match pipeline developerId", async () => {
      expect(
        async () =>
          await controller.createDnsRecord('pipelineId', mockBody, {
            ...mockCredentials,
            groups: ['FoundationsDeveloperAdmin'],
            developerId: 'not-the-same-developer-id',
          }),
      ).rejects.toThrow(ForbiddenException)
    })

    it('Will return 422 if certificate already exists', async () => {
      expect(
        async () =>
          await controller.createDnsRecord('pipelineId', mockBody, {
            ...mockCredentials,
            groups: ['FoundationsDeveloperAdmin'],
          }),
      ).rejects.toThrow(UnprocessableEntityException)
    })

    it('Will return domain and distro url when successful', async () => {
      mockCertificateProvider.obtainCertificate.mockImplementationOnce(() => Promise.resolve(undefined) as any)

      const result = await controller.createDnsRecord('pipelineId', mockBody, {
        ...mockCredentials,
        groups: ['FoundationsDeveloperAdmin'],
      })

      expect(result.customDomain).toBe(mockCustomDomain)
      expect(result.cloudfrontUrl).toBe(mockCloudfrontDistroDomain)
    })
  })
})
