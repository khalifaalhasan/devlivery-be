import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { AppDataSource } from './database/data-source';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    OrganizationModule,
    CampaignModule,
    AttendanceModule,
    DeliveryModule,
    TemplateModule,
    CollabModule,
    AuditModule,
    UserModule,
    AdminModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
