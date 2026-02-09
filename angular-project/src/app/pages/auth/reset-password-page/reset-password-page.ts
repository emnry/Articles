import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {User} from '../../../classes/user';
import {AuthService} from '../../../services/user/auth-service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';


import { NotificationService } from '../../../services/notification/notification-service';


@Component({
  selector: 'app-reset-password-page',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './reset-password-page.html',
  styleUrl: './reset-password-page.scss'
})
export class ResetPasswordPage {

  public user : User = new User();

  constructor(private userService: AuthService,
              private router: Router,
              private notification: NotificationService
) {}


  sendFormData(){
    this.userService.resetPassword(this.user).subscribe({
      next: data => {
        if (data.code == '200') {
          this.notification.success(data.data || 'Mot de passe réinitialisé avec succès');
        } else {
          this.notification.error(data.message || 'Impossible de réinitialiser le mot de passe');
        }
      },
      error: () => {
        this.notification.error('Erreur serveur lors de la réinitialisation');
      }
    });

  }

}
