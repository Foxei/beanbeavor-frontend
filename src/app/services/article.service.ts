import firebase from "firebase/compat/app";
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { DocumentReference } from "@angular/fire/compat/firestore/interfaces";
import {Image} from "./image";
import {Attachment} from "./attachment";
import {User} from "./authentication.service";

import WhereFilterOp = firebase.firestore.WhereFilterOp;
import OrderByDirection = firebase.firestore.OrderByDirection;

export class ArticleDatabaseStatistic {
  numberOfArticles = 0;
}

export interface Article {
  uid: string;
  creationTime: number;
  lastEditTime: number;
  author: firebase.firestore.DocumentReference<User>;
  authorName: string;
  authorImageLink: string;
  title: string;
  description: string;
  images: Image[];
  attachments: Attachment[];
  state: string;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ArticleService {
  private articles: Article[];
  private startingTime: number;
  private endingTime: number;
  private articleStatistic: ArticleDatabaseStatistic = new ArticleDatabaseStatistic();

  constructor(private firestore: AngularFirestore) {
    this.articles = [];
    this.startingTime = 0;
    this.endingTime = 0;

    const arrayMetaData = this.firestore.collection<Article>('articles').snapshotChanges();
    arrayMetaData.subscribe(payload => {
      this.articleStatistic.numberOfArticles = payload.length;
    });
  };

  public getAllArticles(): Observable<Article[]> {
    const collection = this.firestore.collection<Article>('articles', ref => ref.orderBy('title', 'asc'));
    const articles$ = collection.valueChanges();
    return articles$;
  }

  public disableArticle(uuid: string) {
    let document = this.firestore.doc('articles/' + uuid);
    document.update({ enabled: false });
  }

  public enableArticle(uuid: string) {
    let document = this.firestore.doc('articles/' + uuid);
    document.update({ enabled: true });
  }

  public get numberOfArticles(): number {
    return this.articleStatistic.numberOfArticles;
  }

  public get publishedArticles(): Article[] {
    return this.articles;
  }

  public updateArticleSubset(startingTime: number, amount: number, next: boolean) {
    let timeComparison = next ? '>' : '<'
    let orderBy = next ? 'asc' : 'desc' as OrderByDirection | undefined;

    this.startingTime = 0;
    console.log('Searching with: ' + startingTime);

    let options: firebase.firestore.GetOptions = { source: "server" }
    //
    this.firestore.collection<Article>('articles', ref => ref.orderBy('creationTime', orderBy).where('creationTime', timeComparison as WhereFilterOp, startingTime).limit(amount)).get(options).subscribe(temp => {
      console.log(temp)
      this.articles = temp.docs.map(firestoreArticle => {
        let data = firestoreArticle.data();
        data.uid = firestoreArticle.id;
        return data;
      })
      this.articles.forEach(article => {
        if (article.creationTime > this.startingTime) {
          this.startingTime = article.creationTime;
        }
        article.author.get().then(user => {
          if (!user.exists) return;
          article.authorName = user.data()!.displayName;
          article.authorImageLink = user.data()!.photoURL;
        })
      })
      console.log('Ending with: ' + this.startingTime);
    });
  }

  public uploadArticle(article: Article): Promise<DocumentReference<Article>> {
    return this.firestore.collection<Article>('articles').add(article);
  }

  public nextArticleSubset(pageSize: number) {
    this.updateArticleSubset(this.startingTime, pageSize, true);
  }

  public previousArticleSubset(pageSize: number) {
    // this.startingTime = this.articles[0].creationTime;
    this.updateArticleSubset(this.startingTime, pageSize, false);
  }

  public updateArticleSubsetSize(pageSize: number) {
    this.startingTime = this.articles[0].creationTime - 1;
    this.updateArticleSubset(this.startingTime, pageSize, true);
  }

  public loadArticle(uuid: string) {
    let options: firebase.firestore.GetOptions = { source: "server" }

    this.firestore.collection<Article>('articles', ref => ref.where('uuid', '==', uuid).limit(1)).get(options).subscribe(temp => {
      this.articles = temp.docs.map(firestoreArticle => {
        return firestoreArticle.data();
      })
      this.articles.forEach(article => {
        if (article.creationTime > this.startingTime) {
          this.startingTime = article.creationTime;
        }
        article.author.get().then(user => {
          if (!user.exists) return;
          article.authorName = user.data()!.displayName;
          article.authorImageLink = user.data()!.photoURL;
        })
      })
    });
  }
}
