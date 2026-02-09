import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {User} from '../../../classes/user';
import {AuthService} from '../../../services/user/auth-service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import { NotificationService } from '../../../services/notification/notification-service';

@Component({
  selector: 'app-sign-up-page',
  imports: [FormsModule, RouterLink, CommonModule
  ],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.scss'
})
export class SignUpPage {

  public user : User = new User();

  public error:string = '';

  constructor(private userService: AuthService,
              private router: Router,
              private notification: NotificationService
) {}

  sendFormData(){
    this.userService.signUp(this.user).subscribe({
      next: data => {
        if (data.code == '200') {

          this.userService.login(data.data).subscribe({
            next: response => {
              if (response.code == '200') {

                this.notification.success(response.message || 'Inscription réussie');
                this.router.navigate(['/articles']);
              }
              else{
                this.notification.error(response.message || 'Impossible de se connecter après inscription');
              }
            },
            error: () => {
              this.notification.error('Erreur serveur lors de la connexion après inscription');
            }
          });
        }
        else{
          this.notification.error(data.message || 'Impossible de créer le compte');
        }
      },
      error: () => {
        this.notification.error('Erreur serveur lors de l’inscription');
      }
    });


  }


}
