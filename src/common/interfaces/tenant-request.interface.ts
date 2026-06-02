import { Request } from 'express';

export interface TenantRequest extends Request {
  /**
   * ID Organisasi/Tenant aktif yang didapatkan dari sesi atau token.
   * Nilai ini yang akan di-inject ke dalam entity bisnis (organizationId).
   */
  tenantId: string;

  /**
   * ID Pengguna (User) yang sedang terautentikasi melalui Better Auth.
   */
  userId: string;

  /**
   * Role pengguna di dalam tenant/organisasi aktif ini.
   * Diambil dari MemberEntity (owner | admin | manager | viewer).
   */
  userRole?: string;
}