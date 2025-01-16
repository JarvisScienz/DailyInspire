import { Component } from '@angular/core';
import { EmailService } from '../_services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
})
export class EmailComponent {
  formData = {
    day: 'Martedì',
    date: '14/01/2025',
    to_name: 'Davide',
    to_email: 'd.scilletta@gmail.com',
    message: 'La felicità non è avere ciò che si desidera, ma amare ciò che si ha.',
  };

  constructor(private emailService: EmailService) {}

  sendEmail() {
    this.emailService
      .sendEmail(this.formData)
      .then((response) => {
        console.log('Email inviata con successo!', response.status, response.text);
        alert('Email inviata con successo!');
      })
      .catch((error) => {
        console.error('Errore durante l\'invio dell\'email:', error);
        alert('Errore durante l\'invio dell\'email. Riprova.');
      });
  }
}
