import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { env } from 'process';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId = env.EMAILJS_SERVICE_ID || '';
  private templateId = env.EMAILJS_TEMPLATE_ID || ''; 
  private userId = env.EMAILJS_USER_ID || ''; 

  constructor() {}

  sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, formData, this.userId);
  }
}