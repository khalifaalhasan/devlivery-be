import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Resend } from 'resend';
import { Logger } from '@nestjs/common';

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);
  private resend: Resend;

  constructor() {
    super();
    const apiKey = process.env.RESEND_API_KEY || 're_dummy_key';
    this.resend = new Resend(apiKey);
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'send-invitation':
        return this.handleSendInvitation(job.data);
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async handleSendInvitation(data: { id: string; role: string; email: string; organizationId?: string }) {
    this.logger.log(`Memproses pengiriman email invitation ke: ${data.email}`);

    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const inviteLink = `${frontendUrl}/accept-invite?id=${data.id}`;

      const isDev = process.env.NODE_ENV === 'development';
      const targetEmail = isDev ? 'khlfaalhsn5@gmail.com' : data.email;

      const { data: resendData, error } = await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [targetEmail],
        subject: 'Undangan Bergabung ke Workspace Devlivery',
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Halo!</h2>
            <p>Anda telah diundang untuk bergabung ke workspace kami sebagai <strong>${data.role}</strong>.</p>
            <p>Silakan klik tombol di bawah ini untuk menerima undangan:</p>
            <a href="${inviteLink}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Terima Undangan</a>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">Jika tombol tidak berfungsi, salin dan tempel tautan ini ke browser Anda: <br/> ${inviteLink}</p>
          </div>
        `,
      });

      if (error) {
        this.logger.error(`Gagal mengirim email ke ${data.email}: ${error.message}`);
        throw new Error(error.message);
      }

      this.logger.log(`Berhasil mengirim email ke ${data.email} dengan ID: ${resendData?.id}`);
      return resendData;
    } catch (error) {
      this.logger.error(`Error pada handleSendInvitation: ${error.message}`);
      throw error;
    }
  }
}
