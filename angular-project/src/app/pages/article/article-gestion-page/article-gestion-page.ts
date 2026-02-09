import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../../services/article/article-service';
import {HttpClientModule} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {Article} from '../../../classes/article';
import { NotificationService } from '../../../services/notification/notification-service';


@Component({
  selector: 'app-article-gestion-page',
  imports: [
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './article-gestion-page.html',
  styleUrl: './article-gestion-page.scss'
})

export class ArticleGestionPage implements OnInit {

  public articles: Article[] = [];

  constructor(private articleService: ArticleService,
    private notification: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe({
      next: data => {
        if (data.code == '200') {
          this.articles = data.data;
        }else {
          this.notification.error('Impossible de charger les articles');}
      },
      error: () => {
        this.notification.error('Erreur lors du chargement des articles');
      }
    });
  }

  refreshArticles(): void {
    this.loadArticles();
    this.notification.info('Liste actualisée');
  }

  onClickDelete(id: string) {

    this.articleService.delete(id).subscribe({
      next: data => {
        if (data.code == '200') {
          this.notification.success('Article supprimé avec succès');
          this.refreshArticles();
        } else {
          this.notification.error('Suppression impossible');
      }
    },
  error: () => {
        this.notification.error('Erreur serveur lors de la suppression');
  }
  });

  }
}
