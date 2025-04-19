// mailer/mailer.service.ts
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerServiceS {
  constructor(private readonly mailService: MailerService) {}

  async sendResetPasswordEmail(to: string, token: string) {
    const resetUrl = `http://localhost:5173/auth/reset-password?token=${token}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #0A1128;">🔒 Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        
        <div style="margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #0A1128; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Your Password
          </a>
        </div>
  
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <p style="margin-top: 30px;">Thanks,<br/>The Volunteer Connect Team</p>
        
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />
        <small style="color: #777;">
          This link will expire in 1 hour for your security. If you're having trouble, copy and paste this link into your browser:<br/>
          <a href="${resetUrl}" style="color: #0A1128;">${resetUrl}</a>
        </small>
      </div>
    `;

    const info = this.mailService.sendMail({
      from: 'Volunteer Connect <mshaikhmca2024_124@ncrdsims.edu.in>',
      to,
      subject: 'Reset Your Password',
      html: htmlContent,
    });

    return info;
  }
}
