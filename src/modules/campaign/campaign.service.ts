import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { UpdateFormFieldsDto } from './dto/update-form-fields.dto';
import { SubmitFormDto } from './dto/submit-form.dto';
import { CampaignEntity } from './entities/campaign.entity';
import { FormFieldEntity } from './entities/form-field.entity';
import { FormSubmissionEntity } from './entities/form-submission.entity';
import { FormSubmissionValueEntity } from './entities/form-submission-value.entity';
import { randomUUID } from 'crypto';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(tenantId: string, createCampaignDto: CreateCampaignDto) {
    const campaign = this.campaignRepository.create({
      ...createCampaignDto,
      organizationId: tenantId,
      qrCodeToken: randomUUID(),
    });
    return this.campaignRepository.save(campaign);
  }

  async findAll(tenantId: string) {
    return this.campaignRepository.find({
      where: { organizationId: tenantId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { organizationId: tenantId, id },
    });
    
    if (!campaign) {
      throw new NotFoundException('Campaign not found in this organization');
    }
    return campaign;
  }

  async getFormFields(tenantId: string, id: string) {
    const campaign = await this.findOne(tenantId, id);
    return this.dataSource.getRepository(FormFieldEntity).find({
      where: { campaignId: campaign.id, organizationId: tenantId },
      order: { sortOrder: 'ASC' },
    });
  }

  async updateFormFields(tenantId: string, campaignId: string, dto: UpdateFormFieldsDto) {
    const campaign = await this.findOne(tenantId, campaignId);
    
    // Validasi field_key duplicate
    const keys = dto.fields.map((f) => f.fieldKey);
    const uniqueKeys = new Set(keys);
    if (keys.length !== uniqueKeys.size) {
      throw new BadRequestException('field_key tidak boleh duplikat di dalam satu form');
    }

    return this.dataSource.transaction(async (manager) => {
      // 1. Ambil semua field lama
      const existingFields = await manager.find(FormFieldEntity, {
        where: { campaignId: campaign.id, organizationId: tenantId },
      });

      // 2. Hapus yang tidak ada di dto payload
      const newIds = dto.fields.map(f => f.id).filter(Boolean);
      const fieldsToDelete = existingFields.filter(f => !newIds.includes(f.id));
      if (fieldsToDelete.length > 0) {
        await manager.remove(fieldsToDelete);
      }

      // 3. Update atau Insert
      const savedFields: FormFieldEntity[] = [];
      for (const fieldDto of dto.fields) {
        let field;
        if (fieldDto.id) {
          field = await manager.findOne(FormFieldEntity, {
            where: { id: fieldDto.id, campaignId: campaign.id }
          });
          if (field) {
            Object.assign(field, fieldDto);
          }
        }
        
        if (!field) {
          field = manager.create(FormFieldEntity, {
            ...fieldDto,
            campaignId: campaign.id,
            organizationId: tenantId,
          });
        }
        savedFields.push(await manager.save(field));
      }

      return savedFields;
    });
  }

  async update(tenantId: string, id: string, updateCampaignDto: UpdateCampaignDto) {
    const campaign = await this.findOne(tenantId, id);
    Object.assign(campaign, updateCampaignDto);
    return this.campaignRepository.save(campaign);
  }

  async remove(tenantId: string, id: string) {
    const campaign = await this.findOne(tenantId, id);
    return this.campaignRepository.softRemove(campaign);
  }

  async getPublicCampaignBySlug(slug: string) {
    const campaign = await this.campaignRepository.findOne({ where: { slug } });
    if (!campaign) throw new NotFoundException('Campaign not found');

    const fields = await this.dataSource.getRepository(FormFieldEntity).find({
      where: { campaignId: campaign.id },
      order: { sortOrder: 'ASC' },
    });

    return {
      campaign: {
        id: campaign.id,
        name: campaign.name,
        slug: campaign.slug,
        description: campaign.description,
        coverImageUrl: campaign.coverImageUrl,
        eventDate: campaign.eventDate,
        location: campaign.location,
        status: campaign.status,
      },
      fields,
    };
  }

  async submitForm(campaignId: string, dto: SubmitFormDto) {
    const campaign = await this.campaignRepository.findOne({ where: { id: campaignId } });
    if (!campaign) throw new NotFoundException('Campaign not found');

    if (campaign.status !== CampaignStatus.PUBLISHED && campaign.status !== CampaignStatus.ONGOING) {
      throw new BadRequestException('Formulir untuk campaign ini belum dibuka atau sudah ditutup');
    }

    const fields = await this.dataSource.getRepository(FormFieldEntity).find({
      where: { campaignId: campaign.id },
    });

    // Validasi isRequired
    for (const field of fields) {
      if (field.isRequired && !dto.answers[field.fieldKey]) {
        throw new BadRequestException(`Field ${field.label} (${field.fieldKey}) wajib diisi`);
      }
    }

    return this.dataSource.transaction(async (manager) => {
      const submission = manager.create(FormSubmissionEntity, {
        campaignId: campaign.id,
        organizationId: campaign.organizationId,
        respondentName: dto.respondentName,
        respondentEmail: dto.respondentEmail,
      });

      const savedSubmission = await manager.save(submission);

      const submissionValues: FormSubmissionValueEntity[] = [];
      for (const field of fields) {
        if (dto.answers[field.fieldKey] !== undefined) {
          const val = manager.create(FormSubmissionValueEntity, {
            submissionId: savedSubmission.id,
            organizationId: campaign.organizationId,
            fieldId: field.id,
            fieldKey: field.fieldKey,
            value: String(dto.answers[field.fieldKey]),
          });
          submissionValues.push(val);
        }
      }

      if (submissionValues.length > 0) {
        await manager.save(submissionValues);
      }

      return {
        message: 'Form submitted successfully',
        submissionId: savedSubmission.id,
      };
    });
  }
}
