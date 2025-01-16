import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId = environment.emailJS_ServiceID || '';
  private templateId = environment.emailJS_TemplateID || ''; 
  private userId = environment.emailJS_UserID || ''; 

  constructor() {}

  sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, formData, this.userId);
  }
}