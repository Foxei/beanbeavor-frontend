import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "src/app/services/authentication.service";
import {Router} from "@angular/router";
import {ThemeService} from "src/app/services/theme.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService, public themeService: ThemeService,) {
  }

  ngOnInit(): void {
  }

  public get username(): string {
    if(!this.authenticationService.currentUser) return '';
    return this.authenticationService.currentUser.displayName;
  }

  public get email(): string {
    if(!this.authenticationService.currentUser) return '';
    return this.authenticationService.currentUser.email;
  }

  public get creationTime(): string {
    if(!this.authenticationService.currentUser) return '';
    return this.authenticationService.currentUser.creationTime;
  }

  public get lastSignInTime(): string {
    if(!this.authenticationService.currentUser) return '';
    return this.authenticationService.currentUser.lastSignInTime;
  }

  public get isVerified(): boolean {
    if(!this.authenticationService.currentUser) return false;
    return this.authenticationService.currentUser.verified;
  }

  public get isEmailVerified(): boolean {
    if(!this.authenticationService.currentUser) return false;
    return this.authenticationService.currentUser.emailVerified;
  }

  public get isBlocked(): boolean {
    if(!this.authenticationService.currentUser) return false;
    return this.authenticationService.currentUser.role == 'blocked';
  }

  public get isAuthorised(): boolean {
    if(!this.authenticationService.currentUser) return false;
    return this.authenticationService.currentUser.role != 'unauthorised';
  }

  public get role(): string {
    if(!this.authenticationService.currentUser) return '';
    if(!this.authenticationService.currentUser) return '';
    switch (this.authenticationService.currentUser.role){
      case 'unauthorised': return 'Warten auf Freigabe'
      case 'blocked': return 'Blockiert'
      case 'user': return 'Freigegeben'
      case 'moderator': return 'Moderator'
      case 'admin': return 'Admin'
    }
    return '';  }

  public get roleDescription(): string {
    if(!this.authenticationService.currentUser) return '';
    switch (this.authenticationService.currentUser.role){
      case 'unauthorised': return 'Aktuelle steht deine Freigabe durch das Tom Technik Team noch aus.'
      case 'blocked': return 'Dein Account wurde vom Tom Technik Team gesperrt. Bitte kontaktiere uns, wenn du glaubst, dass dies ein Fehler ist.'
      case 'user': return 'Du bist freigegeben und kannst Projekte runterladen, so wie deine eigenen Projekte hochladen.'
      case 'moderator': return 'Du bist Moderator und kann jetzt nicht nur Projekte hoch- bzw. runterladen, sondern auch Projekte von andern Nutzern freigeben.'
      case 'admin': return 'Du bist Administrator und kann Projekte hoch- bzw. runterladen, Projekte von andern Nutzern und neu registrierte Nutzer freigeben.'
    }
    return '';
  }

  public get roleIcon(): string {
    if(!this.authenticationService.currentUser) return '';
    switch (this.authenticationService.currentUser.role){
      case 'unauthorised': return 'pending'
      case 'blocked': return 'sentiment_dissatisfied'
      case 'user': return 'check_circle'
      case 'moderator': return 'star'
      case 'admin': return 'local_police'
    }
    return '';
  }


  public get profilePictureUrl(): string {
    if(!this.authenticationService.currentUser) return '';
    return this.authenticationService.currentUser.photoURL.replace('s96-c', 's300-c');
  }

  public logout(): void {
    this.authenticationService.signOut().then();
  }
}
