import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { TemplateModule } from './modules/template/template.module';
import { CollabModule } from './modules/collab/collab.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [AuthModule, OrganizationModule, CampaignModule, AttendanceModule, DeliveryModule, TemplateModule, CollabModule, AuditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
