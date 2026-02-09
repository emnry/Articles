import { Component } from '@angular/core';
import {User} from '../../../classes/user';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../services/user/auth-service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

import { NotificationService } from '../../../services/notification/notification-service';


@Component({
  selector: 'app-sign-in-page',
  imports: [FormsModule, RouterLink , CommonModule],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss'
})


export class SignInPage {



  public user : User = new User();

  public error:string = '';

  constructor(private userService: AuthService,
              private router: Router,
              private notification: NotificationService

              ) {}

  sendFormData(){

    this.userService.login(this.user).subscribe({
      next: data => {
        if (data.code == '200') {
          this.notification.success('Connexion réussie');
          this.router.navigate(['/articles']);
        }
        else{
          this.notification.error(data.message || 'Identifiants invalides');
        }
      },
      error: () => {
        this.notification.error('Erreur serveur lors de la connexion');
      }
    });

  }

}
