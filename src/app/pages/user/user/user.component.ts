import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'bb-user',
  templateUrl: './user.component.html'
})
export class UserComponent {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  get currentUser() {
    return this.authenticationService.currentUser;
  }

  get username(): string {
    return this.currentUser ? this.currentUser.displayName : 'Max Mustermann'
  }

  get email(): string {
    return this.currentUser ? this.currentUser.email : '';
  }

  get creationTime(): string {
    let time = this.currentUser ? this.currentUser.creationTime : 0;
    const date = new Date(time);
    return date.toLocaleString();
  }

  get lastSignInTime(): string {
    let time = this.currentUser ? this.currentUser.lastSignInTime : 0;
    const date = new Date(time);
    return date.toLocaleString();
  }

  get isVerified(): boolean {
    return this.currentUser ? this.currentUser.verified : false;
  }

  get isEmailVerified(): boolean {
    return this.currentUser ? this.currentUser.emailVerified : false;
  }

  get isBlocked(): boolean {
    return this.currentUser ? this.currentUser.role === 'blocked' : false;
  }

  get isAuthorized(): boolean {
    return this.currentUser ? this.currentUser.role !== 'unauthorized' : false;
  }

  get role(): string {
    return this.currentUser ? this.mapRoleToString(this.currentUser.role) : 'Test Dummy';
  }

  get roleDescription(): string {
    return this.currentUser ? this.mapRoleToDescription(this.currentUser.role) : '';
  }

  public signOut(): void {
    this.authenticationService.signOut().then();
  }

  private mapRoleToString(role: string): string {
    switch (role) {
      case 'blocked':
        return 'Blocked';
      case 'user':
        return 'Consumer';
      case 'maintainer':
        return 'Maintainer';
      case 'admin':
        return 'Administrator';
      default:
        return 'Unknown role';
    }
  }

  private mapRoleToDescription(role: string): string {
    switch (role) {
      case 'blocked':
        return 'This user account has been blocked due to a violation of our terms of service. Please contact support for further assistance.';
      case 'user':
        return 'This user is a consumer and has access to basic features. Consumers can browse products, make purchases, and manage their account settings.';
      case 'maintainer':
        return 'This user is a maintainer with elevated privileges. Maintainers can moderate content, manage user accounts, and ensure the platform runs smoothly.';
      case 'admin':
        return 'This user is an administrator with the highest level of access. Administrators have full control over the system, including user management, configuration, and system-wide settings.';
      default:
        return 'Unknown role';
    }
  }

  private mapRoleToIcon(role: string): string {
    switch (role) {
      case 'blocked':
        return 'sentiment_dissatisfied';
      case 'user':
        return 'check_circle';
      case 'maintainer':
        return 'star';
      case 'admin':
        return 'local_police';
      default:
        return '';
    }
  }
}