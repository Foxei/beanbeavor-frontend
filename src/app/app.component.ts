import { Component } from '@angular/core';
import { ThemeService } from "./services/theme.service";
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title: string = "bean-beavor";

  constructor(public themeService: ThemeService, private authenticationService: AuthenticationService) {
  }

  public get isSignedIn(): boolean {
    return this.authenticationService.isSignedIn;
  }

  public get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  public activateDarkMode(): void {
    this.themeService.activateDarkMode();
  }

  public activateLightMode(): void {
    this.themeService.activateLightMode();
  }

  public get currentUserPhotoURL(): string {
    if (!this.authenticationService.currentUser) return 'https://www.gravatar.com/avatar/?d=mp&r=g&f=y&s=300';
    return this.authenticationService.currentUser.photoURL;
  }

}
