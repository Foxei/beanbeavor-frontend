import firebase from 'firebase/compat/app';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {Observable, of, switchMap} from "rxjs";
import {md5} from './md5';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  role: string;
  verified: boolean;
  creationTime: string;
  lastSignInTime: string;
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthenticationService {
  private user: User | undefined
  private firebaseUser: firebase.User | undefined

  constructor(
    private firestore: AngularFirestore,   // Inject Firestore service
    private fireAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.firebaseUser = user;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.firebaseUser = undefined;
        localStorage.setItem('user', '');
      }
    });

    //This is how we're getting into the firestoreDB
    this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`/users/${user.uid}`).valueChanges();
        } else {
          return of(undefined)
        }
      })
    ).subscribe((user) => {
      this.user = user;
    });
  }

  public get currentUser() {
    return this.user;
  }

  public get userReference() {
    return this.firestore.doc<User>("users/" + this.user!.uid).ref;
  }

  get authenticationState(): Observable<firebase.User | null> {
    return this.fireAuth.authState;
  }

  /////////////////////////////////////////////
  //                  SignUp                 //
  /////////////////////////////////////////////

  public signUp(email: string, password: string, username: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.sendVerificationMail();
        result.user?.updateProfile({
          displayName: username,
          photoURL: 'https://www.gravatar.com/avatar/' + md5(result.user?.email?.trim().toLowerCase()) + '?d=retro&r=g&f=y&s=300'
        }).then(() => {
          if (result.user) {
            this.createUserData(result.user).catch((error) => {
              window.alert(error.message)
            })
          } else {
            window.alert('user not found')
          }
        }).catch((error) => {
          window.alert(error.message)
        })
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  public sendVerificationMail() {
    return this.fireAuth.currentUser.then((user) => {
      if (user)
        user.sendEmailVerification().then(() => {
          this.navigateToActionPage('verificationEmailSend');
        }).catch((error) => {
          window.alert(error.message)
        })
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  /////////////////////////////////////////////
  //             ForgotPassword              //
  /////////////////////////////////////////////

  public forgotPassword(passwordResetEmail: string) {
    return this.fireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  /////////////////////////////////////////////
  //               ActionCodes               //
  /////////////////////////////////////////////

  public applyActionCode(oobCode: string): ReturnType<firebase.auth.Auth["applyActionCode"]> {
    return this.fireAuth.applyActionCode(oobCode);
  }

  /////////////////////////////////////////////
  //            SignIn SignOut               //
  /////////////////////////////////////////////

  public signIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (!result.user) throw new Error('Dein Benutzername oder deine Passwort scheinen nicht zu stimmen.');
        if (!result.user.emailVerified) throw new Error('Du must zuerste deine E-Mail Adresse bestätigen.');
        this.updateUserData(result.user);
      }).catch(() => {
        throw new Error('Stelle sicher, dass deine E-Mail Adresse und dein Benutzername korrekt sind und du deine E-Mail Adresse bestätigt hast.');
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
        console.log('Sucess', value);
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
      });
  }

  private oAuthLogin(provider: any) {
    return this.fireAuth.signInWithPopup(provider).then((result) => {
      if (result.user) {
        if (!result.user.emailVerified) this.sendVerificationMail();
        this.updateUserData(result.user).then();
      } else {
        window.alert('user not found')
      }
    }).catch((error) => {
      window.alert(error.message)
    });
  }

  public signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      //this.navigateToActionPage('login');
    })
  }

  get isSignedIn(): boolean {
    if (!localStorage.getItem('user')) return false;
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false);
  }

  public get isVerified(): boolean {
    if(!this.currentUser) return false;
    return this.currentUser.verified;
  }

  public get isEmailVerified(): boolean {
    if(!this.currentUser) return false;
    return this.currentUser.emailVerified;
  }

  public get isBlocked(): boolean {
    if(!this.currentUser) return false;
    return this.currentUser.role == 'blocked';
  }

  public get isAdmin(): boolean {
    if(!this.currentUser) return false;
    return this.currentUser.role == 'admin';
  }

  /**
   * Setting up user data when sign in with username/password,
   * sign up with username/password and sign in with social auth
   * provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
   */
  private updateUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const userData: Partial<User> = {
      uid: user.uid,
      email: <string>user.email,
      displayName: <string>user.displayName,
      photoURL: <string>user.photoURL,
      emailVerified: user.emailVerified,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime
    }
    return userRef.update(userData);
  }

  private createUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: <string>user.email,
      displayName: <string>user.displayName,
      photoURL: <string>user.photoURL,
      emailVerified: user.emailVerified,
      role: "user",
      verified: false,
      creationTime: user.metadata.creationTime ? user.metadata.creationTime : '',
      lastSignInTime: user.metadata.lastSignInTime ? user.metadata.lastSignInTime : ''
    }
    return userRef.set(userData, {merge: true});

  }

  private navigateToActionPage(mode: string) {
    this.router.navigate(['']).then(() => {
      this.router.navigate(['/action'], {queryParams: {mode: mode}}).then();
    });
  }

  /////////////////////////////////////////////
  //          User Role Management           //
  /////////////////////////////////////////////

  public canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return AuthenticationService.checkAuthorization(user, allowed)
  }

  public canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return AuthenticationService.checkAuthorization(user, allowed)
  }

  public canDelete(user: User): boolean {
    const allowed = ['admin']
    return AuthenticationService.checkAuthorization(user, allowed)
  }

  // determines if user has matching role
  private static checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    if (allowedRoles.length <= 0) return false;
    return user.role in allowedRoles;
  }
}
