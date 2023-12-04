import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/product.service';
import { VersionsService } from "src/app/services/version.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private versionService: VersionsService, private productService: ProductsService) {
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
    if (!this.productService.numberOfProducts) return 0;
    return this.productService.numberOfProducts;
  }

  public get numberOfTransaction(): number {
    return this.versionService.numberOfVersions;
  }

}
