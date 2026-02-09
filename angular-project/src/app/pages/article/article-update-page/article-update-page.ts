import { Component } from '@angular/core';
import {ArticleService} from '../../../services/article/article-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../../../classes/article';
import {FormsModule} from '@angular/forms';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../../../services/notification/notification-service';


@Component({
  selector: 'app-article-update-page',
  imports: [FormsModule,
    CommonModule,],
  templateUrl: './article-update-page.html',
  styleUrl: './article-update-page.scss'
})
export class ArticleUpdatePage {

  public article:any;

  public id : string = "";

  public error:string = '';

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router,
              private notification: NotificationService

) {}


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || "";

    if (this.id) {
      this.articleService.getById(this.id).subscribe({
        next: data => {
          if (data.code == '200') {
            this.article = data.data;

          } else {
          this.notification.error('Article introuvable');
          this.router.navigate(['/manage']);
        }
        }, error: () => {
        this.notification.error('Erreur serveur lors du chargement de l’article');
      }
      });
    }
    else{
      this.article = new Article();
      this.notification.info('Création d’un nouvel article');

    }

  }

  onClickUpdate(newArticle:any){

    if (this.article.imgPath === "") {
    this.article.imgPath = "https://img.freepik.com/vecteurs-libre/lignes-grille-horizontales-abstraites-dans-conception-graphique-style-graphique_1017-39918.jpg?semt=ais_hybrid&w=740&q=80";
    this.notification.info('Image par défaut appliquée');
  
  }

    this.articleService.save(this.article).subscribe({
      next: data => {
        if (data.code == '200') {
          this.notification.success(this.id ? 'Article modifié avec succès' : 'Article créé avec succès');

          if(this.id === ""){
            this.router.navigate(['/articles']);
          }
          else{
            this.router.navigate(['/manage']);
          }


        }
        else{
          this.notification.error(data.message || 'Erreur lors de l’enregistrement');
        }
      },
      error: () => {
        this.notification.error('Erreur serveur lors de l’enregistrement de l’article');
      }
    });
  }

}
