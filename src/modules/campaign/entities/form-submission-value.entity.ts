import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { FormSubmissionEntity } from './form-submission.entity';
import { FormFieldEntity } from './form-field.entity';

@Entity('form_submission_value')
@Index('uq_value_per_field', ['submissionId', 'fieldId'], { unique: true })
export class FormSubmissionValueEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'submission_id' })
  submissionId: string;

  @Column({ type: 'varchar', name: 'field_id' })
  fieldId: string;

  @Column({ type: 'varchar', name: 'field_key' })
  fieldKey: string;

  @Column({ type: 'text', nullable: true })
  value: string;

  @Column({ type: 'varchar', name: 'file_url', nullable: true })
  fileUrl: string;

  @ManyToOne(() => FormSubmissionEntity, (submission) => submission.values, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'submission_id' })
  submission: FormSubmissionEntity;

  @ManyToOne(() => FormFieldEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'field_id' })
  field: FormFieldEntity;
}