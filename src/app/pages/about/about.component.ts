import { Component } from '@angular/core';
import { VersionsService } from "src/app/services/version.service";
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private versionService: VersionsService, private productService: ArticleService) {
  }

  public get version(): string {
    return this.versionService.displayString;
  }

  public get creationTime(): string {
    return this.versionService.displayCreationTime;
  }

  public get description(): string {
    return this.versionService.displayDescription;
  }

  public get numberOfVersion(): number {
    return this.versionService.numberOfVersions;
  }

  public get numberOfProduct(): number {
    if (!this.productService.numberOfArticles) return 0;
    return this.productService.numberOfArticles;
  }

  public get numberOfTransaction(): number {
    return this.versionService.numberOfVersions;
  }

}
