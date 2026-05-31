import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { CertificateTemplateEntity } from './certificate-template.entity';

@Entity('certificate_element')
export class CertificateElementEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'certificate_template_id' })
  certificateTemplateId: string;

  @Column({ type: 'varchar', name: 'element_type' })
  elementType: string; // text | image

  @Column({ type: 'varchar' })
  label: string; // e.g., 'Nama Peserta', 'Logo Sponsor'

  @Column({ type: 'varchar', nullable: true })
  variable: string | null; // {{nama}}, {{role}}, null jika teks statis

  @Column({ type: 'varchar', name: 'static_text', nullable: true })
  staticText: string | null;

  @Column({ type: 'varchar', name: 'font_family', default: 'Arial' })
  fontFamily: string;

  @Column({ type: 'int', name: 'font_size', default: 48 })
  fontSize: number;

  @Column({ type: 'varchar', name: 'font_color', default: '#000000' })
  fontColor: string;

  @Column({ type: 'varchar', name: 'font_weight', default: 'normal' })
  fontWeight: string; // normal | bold

  @Column({ type: 'varchar', name: 'text_align', default: 'center' })
  textAlign: string; // left | center | right

  @Column({ type: 'varchar', name: 'image_url', nullable: true })
  imageUrl: string | null;

  @Column({ type: 'int', name: 'pos_x', default: 0 })
  posX: number;

  @Column({ type: 'int', name: 'pos_y', default: 0 })
  posY: number;

  @Column({ type: 'int', nullable: true })
  width: number | null;

  @Column({ type: 'int', nullable: true })
  height: number | null;

  @Column({ type: 'int', name: 'sort_order', default: 0 })
  sortOrder: number;

  // Relasi
  @ManyToOne(() => CertificateTemplateEntity, (template) => template.elements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'certificate_template_id' })
  certificateTemplate: CertificateTemplateEntity;
}