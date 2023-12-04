import firebase from "firebase/compat";
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

export interface SoftwareVersion {
  uuid: string;
  creationTime: string;
  displayString: string;
  description: string;
};

export interface SoftwareVersionStatistic {
  numberOfVersion: number;
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class VersionsService {
  private _version: SoftwareVersion;
  private _versionStatistic: SoftwareVersionStatistic;

  constructor(private firestore: AngularFirestore) {
    this._version = { uuid: "", creationTime: "", description: "", displayString: "" };
    this._versionStatistic = { numberOfVersion: 0 };

    this._loadSoftwareVersionStatistic();
    this._loadSoftwareVersion();
  };

  private _loadSoftwareVersionStatistic() {
    this.firestore.collection<SoftwareVersion>('versions').snapshotChanges().subscribe(payload => {
      this._versionStatistic.numberOfVersion = payload.length;
    });
  }

  private _loadSoftwareVersion() {
    let options: firebase.firestore.GetOptions = { source: "server" }

    this.firestore.collection<SoftwareVersion>('versions', ref => ref.orderBy('creationTime', 'asc').limit(1)).get(options).subscribe(temp => {
      this._version = temp.docs.map(firestoreArticle => {
        return firestoreArticle.data();
      })[0];
    });
  }

  public get displayString() {
    if (!this._version) return "";
    return this._version.displayString;
  }

  public get displayDescription() {
    if (!this._version) return "";
    return this._version.description;
  }

  public get displayCreationTime() {
    if (!this._version) return "";
    const date = new Date(this._version.creationTime);
    return date.toLocaleString();
  }

  public get numberOfVersions() {
    return this._versionStatistic.numberOfVersion;
  }
}
