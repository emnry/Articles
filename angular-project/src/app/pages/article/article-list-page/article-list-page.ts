import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../../services/article/article-service';
import { HttpClientModule } from '@angular/common/http';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';

import { NotificationService } from '../../../services/notification/notification-service';

@Component({
  selector: 'app-article-list-page',
  imports: [
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './article-list-page.html',
  styleUrl: './article-list-page.scss'
})

export class ArticleListPage implements OnInit {
  public articles: any[] = [];

  constructor(private articleService: ArticleService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe({
      next: data => {
        if (data.code == '200') {
          this.articles = data.data;

          if (this.articles.length === 0) {
            this.notification.info('Aucun article disponible');
          }
          } else {
          this.notification.error('Impossible de récupérer les articles');

        }
      },
      error: () => {
        this.notification.error('Erreur serveur lors du chargement');
      }
    });
  }
}
