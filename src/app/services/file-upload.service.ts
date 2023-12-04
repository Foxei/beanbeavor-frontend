import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface UploadableFile {
  preview: string,
  url: string,
  file: File | null,
  uploadProgress: number
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class FileUploadService {

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  public uploadFile(fileToUpload: UploadableFile): Promise<string> {
    // Generate uuid and set upload progress
    fileToUpload.uploadProgress = 0

    // Upload file to cloud storage
    const key = 'uploads/' + this.firestore.createId();
    const task = this.storage.upload(key, fileToUpload.file);

    // Track upload progress
    task.percentageChanges().subscribe(progress => {
      if (progress)
        fileToUpload.uploadProgress = progress;
    })

    // Finalise if uploaded
    // All errors need to be handled outside of this service
    return task.then(snapshot => {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log('File metadata:', snapshot.metadata);
      return snapshot.ref.getDownloadURL().then(url => {
        fileToUpload.url = url;
      });
    });
  }
}
